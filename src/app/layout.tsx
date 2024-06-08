// components/layout.tsx
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { cn, constructMetadata } from '@/lib/utils';
import { Inter } from 'next/font/google';
import './globals.css';

import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';

import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='light'>
      <Providers>
        {/* <body className={cn('min-h-screen flex flex-col antialiased grainy', inter.className)}> */}
             <body className={cn('min-h-screen flex flex-col bg-gray', inter.className)}>
          <Toaster />
          <Navbar />
          <main className="flex-grow">
            <MaxWidthWrapper>
              {children}
            </MaxWidthWrapper>
          </main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}


