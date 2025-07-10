// src/components/Footer.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import sanityClient from '../client';

// We'll reuse the Icon component for our social media links
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d={path} />
    </svg>
);
const Icons = {
    github: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 4.125a7.875 7.875 0 110 15.75 7.875 7.875 0 010-16.5zm-3.187 8.313a.75.75 0 00-1.063.22l-1.5 2.25a.75.75 0 101.28.858l1.5-2.25a.75.75 0 00-.217-1.088zm6.374 0a.75.75 0 00-.217 1.088l1.5 2.25a.75.75 0 101.28-.858l-1.5-2.25a.75.75 0 00-1.063-.22z",
    linkedin: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-11 6H5v9h3V9zm-1.5-2.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 9h-2.1c-1.6 0-2.9 1.3-2.9 2.9V18h3v-5.1c0-.6.5-1.1 1.1-1.1h.9V9z",
    email: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    phone: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
};

export default function Footer() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        // Updated fetch query to get the 'siteSettings' document
        sanityClient.fetch(
            `*[_type == "siteSettings"][0]{
                about,
                email,
                phone,
                githubUrl,
                linkedinUrl
            }`
        ).then(data => setSettings(data)).catch(console.error);
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const columnVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <footer className="bg-gray-800 text-gray-400">
            <motion.div
                className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* Column 1: About */}
                <motion.div variants={columnVariants}>
                    <h4 className="text-white font-bold mb-4 text-lg">Prisdon Services</h4>
                    <p className="text-sm">
                        {settings?.about?.substring(0, 150) || "Add a description in Site Settings..."}...
                    </p>
                </motion.div>

                {/* Column 2: Quick Links */}
                <motion.div variants={columnVariants}>
                    <h4 className="text-white font-bold mb-4 text-lg">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                        <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </motion.div>
                
                {/* Column 3: Contact Info */}
                <motion.div variants={columnVariants}>
                    <h4 className="text-white font-bold mb-4 text-lg">Contact Info</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start">
                            <Icon path={Icons.email} className="w-5 h-5 mr-3 mt-1 text-blue-400"/>
                            <a href={`mailto:${settings?.email}`} className="hover:text-white transition-colors">{settings?.email || '...'}</a>
                        </li>
                        <li className="flex items-start">
                            <Icon path={Icons.phone} className="w-5 h-5 mr-3 mt-1 text-blue-400"/>
                            <a href={`tel:${settings?.phone}`} className="hover:text-white transition-colors">{settings?.phone || '...'}</a>
                        </li>
                    </ul>
                </motion.div>

                {/* Column 4: Social Media */}
                <motion.div variants={columnVariants}>
                    <h4 className="text-white font-bold mb-4 text-lg">Follow Me</h4>
                    <div className="flex space-x-4">
                        {settings?.githubUrl && (
                            <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform hover:scale-110">
                                <Icon path={Icons.github} />
                            </a>
                        )}
                        {settings?.linkedinUrl && (
                            <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform hover:scale-110">
                                <Icon path={Icons.linkedin} />
                            </a>
                        )}
                    </div>
                </motion.div>
            </motion.div>
      
            <div className="bg-gray-900 py-4">
                <div className="container mx-auto px-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Prisdon Services. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}