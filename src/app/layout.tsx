// components/layout.tsx
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer'; // Import Footer component
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
        <body
          className={cn(
            'min-h-screen font-sans antialiased grainy',
            inter.className
          )}>
          <Toaster />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer /> {/* Include Footer */}
        </body>
      </Providers>
    </html>
  );
}
