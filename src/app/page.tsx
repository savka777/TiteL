import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='mb-12 mt-28 sm:mt-30 flex flex-col items-center justify-center text-center'>
        <div className=''>
          {/* <p className='text-sm font-semibold text-gray-700'>
          </p> */}
        </div>
        {/* <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Get Your Work Seen With
          <span className='text-blue-600'>TiteL</span>{' '}
        </h1> */}
        <h1 className='max-w-10xl text-10xl font-bold md:text-10xl lg:text-7xl text-left '>
  Get your work <br></br> seen with {' '}
  <span className='text-digital-blue'>TiteL</span>
</h1>

        <p className='mt-5 max-w-prose text-zinc-700 lg:text-lg'>
          TiteL.io allows you improve your contents visibilty by generating
          SEO friendly titles for your content.
        </p>

        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}
          href='/dashboard'
          target='_blank'>
          Get started{' '}
          <ArrowRight className='ml-2 h-5 w-5' />
        </Link>
      </MaxWidthWrapper>

            {/* Feature section */}
      <div className='mx-auto mb-0 mt-16 max-w-5xl sm:mt-35'>
        {/* steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          {/* item 1 */}
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-digital-blue'>
                Step 1
              </span>
              <span className='text-xl font-semibold'>
                Sign up for an account
              </span>
              <span className='mt-2 text-zinc-700'>
                Takes less than a minute!{' '}
                {/* <Link
                  href='/pricing'
                  className='text-blue-700 underline underline-offset-2'>
                  pro plan
                </Link> */}
                
              </span>
            </div>
          </li>

          {/* item 2  */}
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-digital-blue'>
                Step 2
              </span>
              <span className='text-xl font-semibold'>
                Select your style of text
              </span>
              <span className='mt-2 text-zinc-700'>
                Choose between News Article, Blog post or Substack .
              </span>
            </div>
          </li>
          
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-digital-blue'>
                Step 3
              </span>
              <span className='text-xl font-semibold'>
                Start generating titles
              </span>
              <span className='mt-2 text-zinc-700'>
                Paste in your text. It&apos;s that simple. Try out TiteL today.
              </span>
            </div>
          </li>
        </ol>
      </div>

      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              // style={{
              //   clipPath:
              //     'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              // }}
              // className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='mx-auto max-w-5xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-digital-blue/5 p-2 ring-1 ring-inset ring-gray-500/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src=''
                    alt='product preview'
                    width={1200}
                    height={600}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray/10'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              // style={{
              //   clipPath:
              //     'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              // }}
              // className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1097ff] to-[#05013e] opacity-10 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className='mx-auto mb-24 mt-16 max-w-5xl sm:mt-35 text-center'>
        <h2 className='text-2xl font-bold text-gray-900'>Discover the impact of well-crafted SEO titles on your content's performance</h2>
        <p className='mt-2 text-zinc-700 lg:text-lg'>
          
        </p>
        <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bol text-digital-blue'>70% increase in CTR</span>
            <span className='mt-2 text-xl font-medium text-zinc-700'></span>
            <p className='mt-2 text-zinc-700'>SEO optimized titles can boost your click-through rate by up to 70%.</p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bol text-digital-blue'>50% higher rankings</span>
            <span className='mt-2 text-xl font-medium text-zinc-700'></span>
            <p className='mt-2 text-zinc-700'>Well-crafted titles contribute to a 50% increase in search engine rankings.</p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bol text-digital-blue'>30% more engagement</span>
            <span className='mt-2 text-xl font-medium text-zinc-700'></span>
            <p className='mt-2 text-zinc-700'>Engaging titles can lead to a 30% increase in user engagement.</p>
          </div>
        </div>
      </div>

       {/* Tips Section */}
       <div className='mx-auto mb-24 mt-16 max-w-5xl sm:mt-35 text-center'>
        <h2 className='text-2xl font-bold text-gray-900'>Rules we follow for Effective SEO Titles</h2>
        <p className='mt-2 text-zinc-700 lg:text-lg'>
          We create SEO-friendly titles that attract clicks and boost your rankings.
        </p>
        <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bol text-digital-blue'>Use keywords</span>
            <p className='mt-2 text-zinc-700'>Incorporating relevant keywords naturally to help search engines understand your content.</p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bol text-digital-blue'>Keep it concise</span>
            <p className='mt-2 text-zinc-700'>Ensuring your titles are concise, ideally under 60 characters, to avoid being cut off in search results.</p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bol text-digital-blue'>Make it engaging</span>
            <p className='mt-2 text-zinc-700'>Crafting engaging titles that prompt users to click by sparking curiosity or addressing a need.</p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bol text-digital-blue'>Use numbers</span>
            <p className='mt-2 text-zinc-700'>Including numbers in titles can make them more attractive and clear to readers.</p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bol text-digital-blue'>Add power words</span>
            <p className='mt-2 text-zinc-700'>Using power words like "best", "ultimate", "proven", etc., to make your titles more compelling.</p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bol text-digital-blue'>Test and iterate</span>
            <p className='mt-2 text-zinc-700'>Experimenting with different titles to see what works best for your audience and improves your SEO.</p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}
