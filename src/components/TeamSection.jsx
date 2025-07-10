// src/components/TeamSection.jsx

import React from 'react';
import { motion } from 'framer-motion';

export default function TeamSection({ teamMembers }) {
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.3 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="bg-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Dedicated Team
                </h2>
            </div>
            <motion.div 
                className="mt-12 container mx-auto grid gap-12 md:grid-cols-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {teamMembers.map((member, index) => (
                    <motion.div 
                        key={index} 
                        variants={cardVariants}
                        className="text-center bg-gray-50 p-8 rounded-lg shadow-lg"
                    >
                        <img
                            src={member.image?.asset?.url}
                            alt={member.name}
                            className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-md"
                        />
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-blue-600 font-semibold">{member.title}</p>
                        <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}