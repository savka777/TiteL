"use client"
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div className="absolute bottom-full right-0 mb-2 w-64 p-2 text-sm text-white bg-black rounded-md shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
