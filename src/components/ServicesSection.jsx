// src/components/ServicesSection.jsx

import React from 'react';
import { motion } from 'framer-motion';

// This component now receives the 'services' data as a prop
export default function ServicesSection({ services }) {

    const Icon = ({ path, className = "w-8 h-8" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d={path} />
        </svg>
    );
    const Icons = {
        code: "M10.25 18.5a.75.75 0 000-1.5H7.75a.75.75 0 000 1.5h2.5zM16.25 18.5a.75.75 0 000-1.5h-2.5a.75.75 0 000 1.5h2.5zM19 6.5a3.5 3.5 0 00-3.5-3.5H8.5A3.5 3.5 0 005 6.5v11A3.5 3.5 0 008.5 21h7a3.5 3.5 0 003.5-3.5v-11zM8.5 5h7a1.5 1.5 0 011.5 1.5v11a1.5 1.5 0 01-1.5 1.5h-7a1.5 1.5 0 01-1.5-1.5v-11A1.5 1.5 0 018.5 5z",
        design: "M12 2.25a.75.75 0 01.75.75v11.265l3.22-3.22a.75.75 0 011.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zM3 18.75a.75.75 0 000 1.5h18a.75.75 0 000-1.5H3z",
        consultancy: "M18 18.75h-5.25v-6.75h5.25V18.75zM11.25 12H6v6.75h5.25V12zM18 3.75h-5.25V10.5h5.25V3.75zM11.25 3.75H6v5.25h5.25V3.75z",
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Services</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    What We Can Do For You
                </p>
            </div>

            <motion.div
                className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {services && services.map((service, index) => (
                    // This motion.div now has the correct animation properties
                    <motion.div 
                        key={index} 
                        variants={cardVariants}
                        // This is the added animation logic for continuous floating
                        animate={{
                            y: [0, -10, 0] // It moves up 10px, then back to the start
                        }}
                        transition={{
                            duration: 3, // Each cycle takes 3 seconds
                            ease: "easeInOut",
                            repeat: Infinity, // Loop the animation forever
                            delay: index * 0.5 // Start each card's animation at a different time
                        }}
                        className="flex flex-col rounded-lg shadow-lg overflow-hidden text-center p-8 bg-gray-50"
                    >
                        <div className="flex-shrink-0">
                            <div className="inline-block p-4 bg-blue-100 rounded-full">
                                <Icon path={Icons[service.icon] || Icons.code} className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">{service.title}</h3>
                        <p className="mt-2 text-base text-gray-500">{service.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}