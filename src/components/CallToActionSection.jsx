// src/components/CallToActionSection.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactFormModal from './ContactFormModal.jsx';

export default function CallToActionSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-blue-900">
                <div 
                    className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8"
                >
                    {/* We are adding new 'animate' and 'transition' props to this element */}
                    <motion.h2
                        className="text-3xl font-extrabold text-white sm:text-4xl"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="block">Have a project in mind?</span>
                        <span className="block text-blue-300">Let's build something amazing together.</span>
                    </motion.h2>
                    
                    {/* This button will now have a subtle pulse animation */}
                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 sm:w-auto"
                        // The 'animate' prop creates the continuous pulse effect
                        animate={{
                            scale: [1, 1.05, 1], // It scales up slightly, then back down
                        }}
                        // The 'transition' prop makes the animation loop forever
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop"
                        }}
                    >
                        Contact Me
                    </motion.button>
                </div>
            </div>

            <ContactFormModal 
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
            />
        </>
    );
}