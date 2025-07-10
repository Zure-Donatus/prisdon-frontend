// src/pages/PortfolioPage.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sanityClient from '../client';

export default function PortfolioPage() {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "project"]{
                title,
                description,
                projectUrl,
                githubUrl,
                mainImage{
                    asset->{ _id, url }
                },
                "categories": categories[]->title
            }`
        ).then(data => setProjects(data)).catch(console.error);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (!projects) return <div>Loading...</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl text-gray-900 font-extrabold tracking-tight">
                    Our Portfolio
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    A collection of our favorite projects we've had the pleasure to work on.
                </p>
            </div>

            <motion.div
                className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {projects.map((project, index) => (
                    <motion.a
                        href={project.projectUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        variants={cardVariants}
                        className="block group"
                    >
                        {/* The 'article' tag was missing its closing tag in the previous version */}
                        <article className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="relative">
                                <img
                                    src={project.mainImage?.asset?.url}
                                    alt={project.title}
                                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-900 text-xl font-bold">
                                        {project.title}
                                    </h3>
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                        </a>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.categories?.map(category => (
                                        <span key={category} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
}