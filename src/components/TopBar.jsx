// src/components/TopBar.jsx

import React from 'react';

export default function TopBar() {
  return (
    // UPDATED RESPONSIVE CLASSES:
    // This now a flex container on all screen sizes.
    // It will be a column on small screens, and a row on medium (md) screens and up.
    <div className="flex flex-col md:flex-row items-center justify-between bg-white text-gray-700 text-sm py-3 px-6 border-b border-gray-200">
      
      {/* This container will also stack its items on mobile */}
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
        <div className="flex items-center space-x-2">
          <span>📍</span>
          <span>Kongo Market, Bolgatanga.</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>✉️</span>
          <span>prisdon33@gmail.com</span>
        </div>
      </div>

      {/* The button will have a small top margin on mobile, but not on larger screens */}
      <a href="#ceo" className="mt-2 md:mt-0 bg-gray-800 text-white px-4 py-1 rounded-md text-xs font-bold hover:bg-gray-700 transition-colors">
        THE CEO
      </a>
    </div>
  );
}