"use client";

import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const BillingForm = () => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const { mutate: createStripeSession, isLoading } =
    trpc.createStripeSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) {
          window.location.href = url;
        } else {
          toast({
            title: "There was a problem...",
            description: "Please try again in a moment",
            variant: "destructive",
          });
        }
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const handlePurchase = (packageId: string) => {
    setSelectedPackage(packageId);
    createStripeSession({ packageId });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-1xl font-bold text-center text-gray-900 mb-2">
          PRICING
        </h1>
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6 text-digital-blue">
          Get more titles
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Purchase more tokens to get more of your work seen
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border rounded-lg shadow-sm bg-white flex flex-col items-center">
            <img
              src="/1coin.png"
              alt="Logo"
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-lg font-bold text-gray-900 mb-2">50 tokens</h3>
            <p className="text-2xl font-bold text-gray-900 mb-4">$5</p>
            <p className="text-gray-600 mb-4 text-center">
              One time purchase for 50 tokens. Good for 50 title generations of
              an article, script, or blog posts of up to 1000 words
            </p>
            <Button
              className="w-full bg-digital-blue text-white"
              onClick={() => handlePurchase("price_1PRCL4P3PzZi6quKwR3gQe2C")}
              disabled={isLoading}
            >
              {isLoading && selectedPackage === "price_1PRCL4P3PzZi6quKwR3gQe2C"
                ? "Processing..."
                : "Buy now"}
            </Button>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white flex flex-col items-center">
            <img
              src="/2coin.png"
              alt="Logo"
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-lg font-bold text-gray-900 mb-2">100 tokens</h3>
            <p className="text-2xl font-bold text-gray-900 mb-4">$8</p>
            <p className="text-gray-600 mb-4 text-center">
              One time purchase for 100 tokens. Good for 100 title generations
              of an article, script, or blog posts of up to 1000 words
            </p>
            <Button
              className="w-full bg-digital-blue text-white"
              onClick={() => handlePurchase("price_1PRCL1P3PzZi6quKrRQXpV6j")}
              disabled={isLoading}
            >
              {isLoading && selectedPackage === "price_1PRCL1P3PzZi6quKrRQXpV6j"
                ? "Processing..."
                : "Buy now"}
            </Button>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white flex flex-col items-center">
            <img
              src="/diamond.png"
              alt="Logo"
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-lg font-bold text-gray-900 mb-2">200 tokens</h3>
            <p className="text-2xl font-bold text-gray-900 mb-4">$10</p>
            <p className="text-gray-600 mb-4 text-center">
              One time purchase for 200 tokens. Good for 200 title generations
              of an article, script, or blog posts of up to 1000 words
            </p>
            <Button
              className="w-full bg-digital-blue text-white"
              onClick={() => handlePurchase("price_1PRCKwP3PzZi6quKyj5lvvQ1")}
              disabled={isLoading}
            >
              {isLoading && selectedPackage === "price_1PRCKwP3PzZi6quKyj5lvvQ1"
                ? "Processing..."
                : "Buy now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
