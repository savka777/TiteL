// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import MaxWidthWrapper from './MaxWidthWrapper';

const Footer = () => {
  return (
    
    <footer className="bg-gray-100 text-gray-700 py-3 mt-5">
      <MaxWidthWrapper>
      <div className="max-w-7xl mx-auto px-1">
        <div className="flex justify-between items-center">
          <div>
          <Link href='/' className='flex items-center z-40 font-semibold'
          >
            {/* <Image src='/text-box.png' alt='Logo' width={40} height={40} className='mr-2' /> */}
            <p className="text-sm hover:underline">© 2024 All rights reserved.</p>
            <span></span>
          </Link>
            {/* <p className="text-sm">© 2023 TiteL. All rights reserved.</p> */}
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</Link>
            <Link href="/terms-service" className="text-sm hover:underline">Terms of Service</Link>
            {/* <p className="text-sm hover:underline">Contact: support@title</p> */}
          </div>
        </div>
      </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
