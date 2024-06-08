'use client';
import { useState } from 'react';
import { trpc } from '@/app/_trpc/client';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';

const BillingForm = () => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const { mutate: createStripeSession, isLoading } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      if (url) {
        window.location.href = url;
      } else {
        toast({
          title: 'There was a problem...',
          description: 'Please try again in a moment',
          variant: 'destructive',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handlePurchase = (packageId: string) => {
    setSelectedPackage(packageId);
    createStripeSession({ packageId });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Select a Token Package</h2>
        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => handlePurchase('price_1PPPQVP3PzZi6quKQ6kQPDb0')}
            disabled={isLoading}
          >
            {isLoading && selectedPackage === 'price_1PPPQVP3PzZi6quKQ6kQPDb0' ? 'Processing...' : 'Buy 50 Tokens for $5'}
          </Button>
          <Button
            className="w-full"
            onClick={() => handlePurchase('price_1PPPRcP3PzZi6quKkn3eKGR6')}
            disabled={isLoading}
          >
            {isLoading && selectedPackage === 'price_1PPPRcP3PzZi6quKkn3eKGR6' ? 'Processing...' : 'Buy 100 Tokens for $8'}
          </Button>
          <Button
            className="w-full"
            onClick={() => handlePurchase('price_1PPPRuP3PzZi6quKhk2ypHIG')}
            disabled={isLoading}
          >
            {isLoading && selectedPackage === 'price_1PPPRuP3PzZi6quKhk2ypHIG' ? 'Processing...' : 'Buy 200 Tokens for $10'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
