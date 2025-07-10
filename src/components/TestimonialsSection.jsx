// src/components/TestimonialsSection.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TestimonialsSection({ testimonials }) {
    // State to track the index of the currently "active" (clicked) card.
    const [activeCardIndex, setActiveCardIndex] = useState(null);

    // Handles the click event on a card.
    const handleCardClick = (index) => {
        setActiveCardIndex(prevIndex => (prevIndex === index ? null : index));
    };

    // Variants for the container to stagger the initial animation.
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    // Variants for the individual testimonial cards with all animation states.
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        // The default, floating state.
        visible: (index) => ({
            opacity: 1,
            y: [0, -8, 0], // Keyframes for floating motion.
            transition: {
                type: 'spring', stiffness: 200, damping: 25,
                y: {
                    duration: 3 + index * 0.5, // Each card floats at a different speed.
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                }
            }
        }),
        // The "paused" state when a card is clicked.
        active: {
            opacity: 1,
            y: 0, // Stop vertical movement.
            scale: 1.05, // Make the card pop slightly.
            transition: {
                type: 'spring', stiffness: 300, damping: 20,
            }
        }
    };

    return (
        <div className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    What Clients Say
                </h2>
            </div>
            <motion.div 
                className="mt-12 container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        custom={index} // Pass the index to our 'visible' variant.
                        // This prop controls which variant is active.
                        // If this card's index matches the active index, use the 'active' variant.
                        // Otherwise, it will default to the 'visible' (floating) variant.
                        animate={activeCardIndex === index ? 'active' : 'visible'}
                        onClick={() => handleCardClick(index)}
                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                    >
                        <p className="text-gray-600 italic text-lg">"{testimonial.quote}"</p>
                        <p className="font-bold text-gray-900 mt-6">- {testimonial.author}</p>
                        <p className="text-sm text-blue-600 font-semibold">{testimonial.company}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}