import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  const subscriptionPlan = await getUserSubscriptionPlan();

  // Fetch the token balance from the database
  const tokenBalance = dbUser.tokenBalance;

  // Pass the user ID as a prop to the Dashboard component
  //removed subscriptionPlan={subscriptionPlan}
  return <Dashboard tokenBalance={tokenBalance} userId={user.id} />;
};

export default Page;
