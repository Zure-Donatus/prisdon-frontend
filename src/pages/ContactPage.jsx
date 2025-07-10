// src/pages/ContactPage.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sanityClient from '../client';

export default function ContactPage() {
    const [pageContent, setPageContent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
    });

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "contactPage"][0]{
                leftColumnTitle,
                contactNumber,
                servicesList,
                leftColumnImage{
                    asset->{
                        url
                    }
                }
            }`
        ).then(data => setPageContent(data)).catch(console.error);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a future step, we will add code here to send the email.
        alert('Thank you for your message! This form is currently a demo.');
    };

    if (!pageContent) return <div>Loading...</div>;

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Column - Animated */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* This is a styled placeholder inspired by your screenshot */}
                    <div className="bg-gray-100 p-8 rounded-lg text-center relative overflow-hidden">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{pageContent.leftColumnTitle}</h2>
                        {pageContent.leftColumnImage && (
                            <img src={pageContent.leftColumnImage.asset.url} alt="Contact" className="w-48 h-48 rounded-full mx-auto shadow-lg border-4 border-white my-4"/>
                        )}
                        <a href={`tel:${pageContent.contactNumber}`} className="inline-block bg-green-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-green-600 transition-colors">
                            Contact Us: {pageContent.contactNumber}
                        </a>
                    </div>
                </motion.div>

                {/* Right Column (Form) - Animated */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" name="name" placeholder="Name *" required className="w-full p-3 border border-gray-300 rounded-md" onChange={handleInputChange} />
                            <input type="tel" name="phone" placeholder="Phone *" required className="w-full p-3 border border-gray-300 rounded-md" onChange={handleInputChange} />
                        </div>
                        <input type="email" name="email" placeholder="Email *" required className="w-full p-3 border border-gray-300 rounded-md" onChange={handleInputChange} />
                        <select name="service" required className="w-full p-3 border border-gray-300 rounded-md" onChange={handleInputChange}>
                            <option value="">Service you're looking for?</option>
                            {pageContent.servicesList?.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                        <textarea name="message" placeholder="Message" rows="5" className="w-full p-3 border border-gray-300 rounded-md" onChange={handleInputChange}></textarea>
                        <div className="text-center">
                            <button type="submit" className="bg-blue-900 text-white font-bold py-3 px-12 rounded-md hover:bg-blue-800 transition-colors">
                                GET A QUOTES
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}