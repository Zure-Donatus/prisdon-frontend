// src/components/Hero.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // We import the animation library
import sanityClient from '../client';

export default function Hero() {
  const [heroContent, setHeroContent] = useState(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    // Fetch the hero content from Sanity
    sanityClient
      .fetch(
        `*[_type == "hero"][0]{
          title,
          subtitle,
          backgroundImages[]{
            asset->{
              url
            }
          }
        }`
      )
      .then((data) => setHeroContent(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    // This effect creates the cycling background image
    if (heroContent && heroContent.backgroundImages) {
      const intervalId = setInterval(() => {
        setCurrentBgIndex((prevIndex) => (prevIndex + 1) % heroContent.backgroundImages.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(intervalId); // Clean up the interval
    }
  }, [heroContent]);

  if (!heroContent) {
    return <div className="min-h-screen bg-gray-700"></div>; // Placeholder while loading
  }

  const currentImageUrl = heroContent.backgroundImages[currentBgIndex]?.asset?.url;

  return (
    <section 
      className="relative h-screen flex items-center justify-center text-white bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${currentImageUrl})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center px-4">
        {/* Animated Title using Framer Motion */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }} // Start invisible and 50px above
          animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
          transition={{ duration: 0.8 }} // Animation duration
          className="text-5xl md:text-7xl font-extrabold tracking-widest uppercase"
        >
          {heroContent.title}
        </motion.h1>

        {/* Animated Subtitle using Framer Motion */}
        <motion.p
          initial={{ opacity: 0, y: 50 }} // Start invisible and 50px below
          animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
          transition={{ duration: 0.8, delay: 0.3 }} // Animate after a short delay
          className="text-lg md:text-2xl mt-4 font-light tracking-wider"
        >
          {heroContent.subtitle}
        </motion.p>
      </div>
    </section>
  );
}