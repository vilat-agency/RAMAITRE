import React from 'react';
import { lexique } from '../data/lexique';

export const LexiqueSidebar = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-gray-200 z-50 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Lexique Académique</h2>
      <button onClick={onClose} className="absolute top-4 right-4">Fermer</button>
      <div className="flex flex-col gap-4">
        {Object.entries(lexique).map(([term, def]) => (
          <div key={term} className="p-3 bg-gray-50 rounded-lg">
            <strong className="block text-blue-700 capitalize">{term}</strong>
            <p className="text-sm text-gray-600">{def}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
