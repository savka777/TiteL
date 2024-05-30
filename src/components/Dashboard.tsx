'use client'

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import UploadButton from './UploadButton';
import { getUserSubscriptionPlan } from '@/lib/stripe';

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const Dashboard = ({ subscriptionPlan }: PageProps) => {
  const [articleText, setArticleText] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleGenerateTitle = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/title/generate-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleText }),
      });

      const data = await response.json();
      console.log('API Response Data:', data); // Log the response data

      if (response.ok) {
        setGeneratedTitle(data.title);
      } else {
        console.error('Error generating title:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <main className='mx-auto max-w-4xl md:p-10'>
      <h1 className='mb-5 text-center font-bold text-4xl text-gray-900'>
        Dashboard
      </h1>
      <div className='mb-8 p-5 border rounded-md'>
        <textarea
          className='w-full p-2 border rounded-md mb-4'
          placeholder='Enter your article text here...'
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          rows={10}
        />
        <div className='flex justify-between items-center'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
            onClick={handleGenerateTitle}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Generate Title'}
          </button>
          <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
        </div>
      </div>
      {generatedTitle && (
        <div className="mt-8 p-5 border rounded-md">
          <h2 className="text-xl font-semibold">Generated Title</h2>
          <p className="mt-2">{generatedTitle}</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
