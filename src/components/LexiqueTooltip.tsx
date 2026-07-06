import React, { useState } from 'react';

export const LexiqueTooltip = ({ term, definition, children }: { term: string, definition: string, children: React.ReactNode }) => {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-block cursor-help group" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <span className="border-b-2 border-dotted border-blue-400 text-blue-800">{children}</span>
      {show && (
        <span className="absolute z-50 w-64 p-3 mt-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg -left-1/2">
          <strong className="block text-blue-300 mb-1">{term}</strong>
          {definition}
        </span>
      )}
    </span>
  );
};
