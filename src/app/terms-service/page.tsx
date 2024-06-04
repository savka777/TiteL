// pages/terms-of-service.tsx
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const TermsOfService = () => {
  return (
    <MaxWidthWrapper className='my-12 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl p-6 border border-gray-200 rounded-md'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6' style={{ fontFamily: 'var(--font-primary)' }}>Terms of Service</h1>
        
        <p className='text-gray-700 mb-4'>
          Welcome to TiteL.io! These terms and conditions outline the rules and regulations for the use of our service.
        </p>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>1. Introduction</h2>
        <p className='text-gray-700 mb-4'>
          By accessing and using TiteL.io, you accept and agree to be bound by the terms and provisions of this agreement. 
          If you do not agree to abide by the above, please do not use this service.
        </p>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>2. Changes to Terms</h2>
        <p className='text-gray-700 mb-4'>
          We reserve the right to update or modify these terms at any time without prior notice. 
          Your continued use of the service following the posting of any changes to these terms constitutes acceptance of those changes.
        </p>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>3. User Responsibilities</h2>
        <p className='text-gray-700 mb-4'>
          You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the service.
        </p>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>4. Account Terms</h2>
        <p className='text-gray-700 mb-4'>
          You are responsible for maintaining the security of your account and password. We cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
        </p>
{/* 
        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. Payment and Refunds</h2>
        <p className='text-gray-700 mb-4'>
          All payments are non-refundable. We offer a free plan with limited features and a paid plan with additional features.
        </p> */}

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. Intellectual Property</h2>
        <p className='text-gray-700 mb-4'>
          The content, layout, design, data, databases, and graphics on this website are protected by intellectual property laws and are owned by TiteL.io. 
          You may not reproduce, republish, distribute, or otherwise use any of the content without our express written consent.
        </p>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>6. Termination</h2>
        <p className='text-gray-700 mb-4'>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms.
        </p>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>7. Disclaimers and Limitation of Liability</h2>
        <p className='text-gray-700 mb-4'>
          The service is provided "as is" and "as available" without any warranties of any kind. In no event shall TiteL.io be liable for any indirect, incidental, special, consequential, or punitive damages.
        </p>

        {/* <h2 className='text-2xl font-semibold text-gray-900 mb-4'>8. Governing Law</h2>
        <p className='text-gray-700 mb-4'>
          These terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
        </p> */}

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>8. Contact Us</h2>
        <p className='text-gray-700 mb-4'>
          If you have any questions about these Terms, please contact us at: support@titel.io
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default TermsOfService;
