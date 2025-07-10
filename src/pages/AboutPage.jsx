// src/pages/AboutPage.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sanityClient from '../client';
import BlockContent from '@sanity/block-content-to-react';

export default function AboutPage() {
    const [aboutContent, setAboutContent] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "aboutPage"][0]{
                title,
                profileImage{
                    asset->{
                        _id,
                        url
                    }
                },
                biography
            }`
        ).then(data => setAboutContent(data)).catch(console.error);
    }, []);

    if (!aboutContent) return <div>Loading...</div>;

    return (
        <div className="bg-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-4xl md:text-6xl font-extrabold text-gray-900 mb-12"
                >
                    {aboutContent.title}
                </motion.h1>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="lg:col-span-2"
                    >
                        {aboutContent.profileImage && (
                            <img
                                src={aboutContent.profileImage.asset.url}
                                alt="Profile"
                                className="rounded-lg shadow-2xl w-full h-auto object-cover"
                            />
                        )}
                    </motion.div>

                    {/* Biography Column */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                        className="lg:col-span-3 prose prose-lg text-gray-600 max-w-none"
                    >
                        <BlockContent blocks={aboutContent.biography} projectId={sanityClient.config().projectId} dataset={sanityClient.config().dataset} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}