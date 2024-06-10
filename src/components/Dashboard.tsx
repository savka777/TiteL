'use client';

import { useState, useEffect } from 'react';
import { Loader2, Clipboard, Check, Coffee, Coins } from 'lucide-react'; // Import Coin icon
import { Button } from './ui/button';
import { trpc } from '@/app/_trpc/client';

interface PageProps {
  tokenBalance: number;
}

const Dashboard = ({ tokenBalance: initialTokenBalance }: PageProps) => {
  const [articleText, setArticleText] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [articleType, setArticleType] = useState('News Article');
  const [displayArticleType, setDisplayArticleType] = useState('News Article');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false); 
  const [wordCount, setWordCount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(initialTokenBalance);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleGenerateTitle = async () => {
    if (tokenBalance <= 0) {
      alert('You have no tokens left. Please purchase more tokens.');
      return;
    }

    const words = articleText.trim().split(/\s+/).length;
    if (words > 1000) {
      alert('Input exceeds 1000 words. Please shorten your text.');
      return;
    }

    if (articleText.length < 299) {
      alert('Article text must be at least 50 words.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/title/generate-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleText, articleType }),
      });

      const data = await response.json();
      console.log('API Response Data:', data);

      if (response.ok) {
        setGeneratedTitle(data.title);
        setDisplayArticleType(articleType);
        setIsCopied(false); 
        setTokenBalance(tokenBalance - 1);

        const updateTokenBalanceMutation = trpc.updateTokenBalance.useMutation();
        await updateTokenBalanceMutation.mutateAsync({ decrement: 1 });
      } else {
        console.error('Error generating title:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedTitle).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch((err) => {
      console.error('Failed to copy the text to clipboard', err);
    });
  };

  const handleTextChange = (e: { target: { value: any; }; }) => {
    const text = e.target.value;
    setArticleText(text);
    setWordCount(text.trim().split(/\s+/).length);
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <main className='mx-auto max-w-4xl md:p-10'>
      <h1 className='mb-5 text-center font-semi-bold text-4xl text-gray-900'>
        Dashboard
      </h1>
      <div className='mb-8 p-5 border rounded-md'>
        <div className="mb-4 flex justify-between items-center">
          <div className="relative inline-block text-left">
            <div className="flex items-center">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {articleType}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="none">
                    {['News Article', 'Blog Post', 'Substack'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setArticleType(type);
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center ml-4">
                <Coins className="h-5 w-5 text-gray-700"  />
                <span className="ml-1 text-sm text-gray-700">{tokenBalance}</span>
              </div>
            </div>
          </div>
        </div>
        <textarea
          className='w-full p-5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4'
          placeholder='Enter your text here...'
          value={articleText}
          onChange={handleTextChange}
          rows={10}
        />
        <div className='flex justify-between items-center'>
          <button
            className='px-4 py-2 bg-digital-blue-500 text-white rounded-md flex items-center justify-center'
            onClick={handleGenerateTitle}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Generate Title'}
          </button>
          <span className="text-sm text-gray-600">{wordCount}/1000 words</span>
        </div>
      </div>
      {generatedTitle && (
        <div className="mt-8 p-5 border rounded-md">
          <div className='flex justify-between items-center'>
            <h1 className="text-xl font-bold">{generatedTitle}</h1>
            <button
              className="p-2 ml-4 border border-gray-300 rounded-md shadow-sm flex items-center justify-center bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={handleCopyToClipboard}
            >
              {isCopied ? <Check className='h-5 w-5 text-digital-blue' /> : <Clipboard className='h-5 w-5' />}
            </button>
          </div>
        </div>
      )}
      <a
        href="https://www.buymeacoffee.com/titel"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 p-3 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
      >
        <Coffee className="h-6 w-6 text-white" />
      </a>
    </main>
  );
};

export default Dashboard;
