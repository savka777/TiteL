import React from 'react';

const Banner = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="relative isolate flex items-center gap-x-4 overflow-hidden bg-gray-500 bg-opacity-30 px-6 py-2 pb-4 rounded-lg border border-black sm:px-3.5 sm:before:flex-1 mb-4">
      <div className="flex items-center gap-x-4">
        <p className="text-sm leading-6 text-gray-900 flex items-center">
          <strong className="font-semibold">No Tokens Left</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx="1" cy="1" r="1" />
          </svg>
          Please purchase more tokens to continue generating titles.
        </p>
        <a
          href="/dashboard/billing"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm bg-digital-blue hover:bg-digital-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Purchase Tokens <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={onClose}>
          <span className="sr-only">Dismiss</span>
          <svg
            className="h-5 w-5 text-gray-900"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Banner;
