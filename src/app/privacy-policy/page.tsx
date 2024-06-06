import MaxWidthWrapper from '@/components/MaxWidthWrapper';


const PrivacyPolicy = () => {
  return (
    <MaxWidthWrapper className='my-12 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl p-6 border border-gray-200 rounded-md text-left'>
        <h1 className='text-4xl font-bold text-gray-900 mb-6'>Privacy Policy</h1>
        <p className='text-gray-700 mb-4'>
          At TiteL.io, we value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and share information about you when you visit our website.
        </p>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Information We Collect</h2>
        <p className='text-gray-700 mb-4'>
        </p>
        <ul className='list-disc list-inside text-gray-700 mb-4 text-left mx-auto max-w-3xl'>
        
          <li>Personal Information: Such as your name, email address.</li>
          <li>Usage Data: Information about your interactions with our website, such as pages visited, time spent on the site, and links clicked.</li>
          <li>Cookies: We use cookies and similar tracking technologies to enhance your experience on our website.</li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>How We Use Your Information</h2>
        <p className='text-gray-700 mb-4'>
        </p>
        <ul className='list-disc list-inside text-gray-700 mb-4 text-left mx-auto max-w-3xl'>
          <li>Provide and improve our services, including generating SEO-friendly titles for your content.</li>
          <li>Analyze usage and trends to improve our website and services.</li>
          <li>We will not share your information with third parties</li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Your Rights</h2>
        <p className='text-gray-700 mb-4'>
        </p>
        <ul className='list-disc list-inside text-gray-700 mb-4 text-left mx-auto max-w-3xl'>
          <li>Access: The right to request access to your personal information.</li>
          <li>Deletion: The right to request deletion of your personal information.</li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Data Security</h2>
        <ul className='list-disc list-inside text-gray-700 mb-4 text-left mx-auto max-w-3xl'>
          <li>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Changes to This Policy</h2>
        <ul className='list-disc list-inside text-gray-700 mb-4 text-left mx-auto max-w-3xl'>
          <li>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website.</li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Contact Us</h2>
        <p className='text-gray-700 mb-4'>
          If you have any questions or concerns about this privacy policy, please contact us at: support@titel.io
        </p>

        <p className='text-gray-700'>
          Effective Date: 6/4/2024
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default PrivacyPolicy;
