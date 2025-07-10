// src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl">Prisdon Services</Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 hover:bg-blue-800 rounded">HOME</Link>
            <Link to="/about" className="px-3 py-2 hover:bg-blue-800 rounded">ABOUT</Link>
            <Link to="/services" className="px-3 py-2 hover:bg-blue-800 rounded">SERVICE</Link>
            <Link to="/portfolio" className="px-3 py-2 hover:bg-blue-800 rounded">PORTFOLIO</Link>
            <Link to="/blog" className="px-3 py-2 hover:bg-blue-800 rounded">BLOG</Link> {/* Added the link here */}
            <Link to="/contact" className="px-3 py-2 hover:bg-blue-800 rounded">CONTACT</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pt-2 pb-4 space-y-2">
          <Link to="/" className="block px-3 py-2 hover:bg-blue-800 rounded">HOME</Link>
          <Link to="/about" className="block px-3 py-2 hover:bg-blue-800 rounded">ABOUT</Link>
          <Link to="/services" className="block px-3 py-2 hover:bg-blue-800 rounded">SERVICE</Link>
          <Link to="/portfolio" className="block px-3 py-2 hover:bg-blue-800 rounded">PORTFOLIO</Link>
          <Link to="/blog" className="block px-3 py-2 hover:bg-blue-800 rounded">BLOG</Link> {/* Added the link here */}
          <Link to="/contact" className="block px-3 py-2 hover:bg-blue-800 rounded">CONTACT</Link>
        </div>
      )}
    </nav>
  );
}