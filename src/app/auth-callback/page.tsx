"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams ? searchParams.get("origin") : null;

  const [loading, setLoading] = useState(true);

  const { data, error, isLoading } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      setLoading(false);
      if (success) {
        router.push(origin ? `/${origin}` : "/dashboard");
      } else {
        console.error("Authentication failed: success flag is false");
        router.push("/dashboard");
      }
    },
    onError: (err) => {
      setLoading(false);
      console.error("Authentication error:", err);
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/dashboard");
      }
    },
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    if (!isLoading && !data && !error) {
      setLoading(false);
      router.push("/dashboard");
    }
  }, [isLoading, data, error, router]);

  return (
    <div className="w-full mt-24 flex justify-center">
      {loading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="font-semibold text-xl">Setting up your account...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      ) : (
        <div>
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default Page;
