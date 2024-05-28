import { cn } from '@/lib/utils'
import "./globals.css";
import type { Metadata } from "next";
import './globals.css'
import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar';



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TiteL.io",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='light'>
        <body
          className={cn(
            'min-h-screen font-sans antialiased grainy',
            inter.className
          )}>
            <Navbar />
          {children}
        </body>
    </html>
  )
}
