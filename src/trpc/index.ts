import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    try {
      const { getUser } = getKindeServerSession();
      const user = getUser();

      if (!user.id || !user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Check if the user is in the database
      const dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      });

      if (!dbUser) {
        // Create user in db with initial token balance
        await db.user.create({
          data: {
            id: user.id,
            email: user.email,
            tokenBalance: 5, // Set initial token balance to 5
          },
        });
      }

      return { success: true };
    } catch (error) {
      console.error("authCallback error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to authenticate user",
        cause: error,
      });
    }
  }),

  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    try {
      const { userId } = ctx;
      return await db.file.findMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error("getUserFiles error:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to get user files" });
    }
  }),

  createStripeSession: privateProcedure
    .input(
      z.object({
        packageId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { packageId } = input;

        if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

        const dbUser = await db.user.findFirst({
          where: {
            id: userId,
          },
        });

        if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

        const billingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;

        const stripeSession = await stripe.checkout.sessions.create({
          success_url: billingUrl,
          cancel_url: billingUrl,
          payment_method_types: ["card"],
          mode: "payment", // Add the mode parameter
          line_items: [
            {
              price: packageId,
              quantity: 1,
            },
          ],
          metadata: {
            userId: userId,
            priceId: packageId, // Include priceId in metadata
          },
        });

        // After creating the Stripe session, update the user's token balance in the database
        // const selectedPlan = PLANS.find(
        //   (plan: (typeof PLANS)[number]) =>
        //     plan.price.priceIds.test === packageId,
        // );
        // if (selectedPlan) {
        //   await db.user.update({
        //     where: { id: userId },
        //     data: { tokenBalance: { increment: selectedPlan.quota } },
        //   });
        // }

        return { url: stripeSession.url };
      } catch (error) {
        console.error("createStripeSession error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create Stripe session",
          cause: error,
        });
      }
    }),

  updateTokenBalance: privateProcedure
    .input(
      z.object({
        decrement: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { decrement } = input;

        if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

        await db.user.update({
          where: { id: userId },
          data: { tokenBalance: { decrement } },
        });

        return { success: true };
      } catch (error) {
        console.error("updateTokenBalance error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update token balance",
          cause: error,
        });
      }
    }),

  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { fileId, cursor } = input;
        const limit = input.limit ?? INFINITE_QUERY_LIMIT;

        const file = await db.file.findFirst({
          where: {
            id: fileId,
            userId,
          },
        });

        if (!file) throw new TRPCError({ code: "NOT_FOUND" });

        const messages = await db.message.findMany({
          take: limit + 1,
          where: {
            fileId,
          },
          orderBy: {
            createdAt: "desc",
          },
          cursor: cursor ? { id: cursor } : undefined,
          select: {
            id: true,
            isUserMessage: true,
            createdAt: true,
            text: true,
          },
        });

        let nextCursor: typeof cursor | undefined = undefined;
        if (messages.length > limit) {
          const nextItem = messages.pop();
          nextCursor = nextItem?.id;
        }

        return {
          messages,
          nextCursor,
        };
      } catch (error) {
        console.error("getFileMessages error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get file messages",
          cause: error,
        });
      }
    }),

  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const file = await db.file.findFirst({
          where: {
            id: input.fileId,
            userId: ctx.userId,
          },
        });

        if (!file) return { status: "PENDING" as const };

        return { status: file.uploadStatus };
      } catch (error) {
        console.error("getFileUploadStatus error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get file upload status",
          cause: error,
        });
      }
    }),

  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;

        const file = await db.file.findFirst({
          where: {
            key: input.key,
            userId,
          },
        });

        if (!file) throw new TRPCError({ code: "NOT_FOUND" });

        return file;
      } catch (error) {
        console.error("getFile error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get file",
          cause: error,
        });
      }
    }),

  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;

        const file = await db.file.findFirst({
          where: {
            id: input.id,
            userId,
          },
        });

        if (!file) throw new TRPCError({ code: "NOT_FOUND" });

        await db.file.delete({
          where: {
            id: input.id,
          },
        });

        return file;
      } catch (error) {
        console.error("deleteFile error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete file",
          cause: error,
        });
      }
    }),
});

export type AppRouter = typeof appRouter;
