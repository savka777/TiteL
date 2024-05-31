'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import UploadButton from '../UploadButton'

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const Dashboard = ({ subscriptionPlan }: PageProps) => {
  const [articleText, setArticleText] = useState('')
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [generatedTitle, setGeneratedTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateTitle = () => {
    setIsLoading(true)
    // Placeholder for title generation logic
    setTimeout(() => {
      setGeneratedTitle('Generated Title')
      setIsLoading(false)
    }, 2000)
  }

  return (
    <main className='mx-auto max-w-4xl md:p-10'>
      <h1 className='mb-5 text-center font-bold text-4xl text-gray-900'>
        Dashboard
      </h1>
      <div className='mb-8 p-5 border rounded-md'>
        <textarea
          className='w-full p-2 border rounded-md mb-4'
          placeholder='Article text (or user can upload)'
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
            {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Generate'}
          </button>
          <UploadButton
            isSubscribed={subscriptionPlan.isSubscribed}
          />
        </div>
      </div>
      {generatedTitle && (
        <div className="mt-8 p-5 border rounded-md">
          <h2 className="text-xl font-semibold">Output Title</h2>
          <p className="mt-2">{generatedTitle}</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard
