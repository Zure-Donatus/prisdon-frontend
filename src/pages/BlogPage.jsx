// src/pages/BlogPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import sanityClient from '../client';

export default function BlogPage() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "post"]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                "authorName": author->name,
                "authorImage": author->image.asset->url
            }`
        ).then(data => setPosts(data)).catch(console.error);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 } // Increased stagger for a nicer effect
        }
    };

    // --- THIS IS THE CORRECTED ANIMATION LOGIC ---
    // We are combining the entrance and floating animation into one set of instructions.
    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: (i) => ({ // 'i' is the index, which we'll use for a delay
            y: [0, -8, 0], // The floating animation for the y-axis
            opacity: 1,
            transition: {
                // This transition applies to the initial entrance (y and opacity)
                duration: 0.5,
                delay: i * 0.1, // Stagger the entrance of each card
                // This transition is specifically for the 'y' property to make it loop
                y: {
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                }
            }
        })
    };

    return (
        <div className="bg-gray-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl text-gray-900 font-extrabold tracking-tight">
                    From The Blog
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    Sharing insights, tutorials, and updates from my journey in tech.
                </p>
            </div>

            <motion.div
                className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {!posts && <p className="col-span-3 text-center">Loading posts...</p>}
                
                {posts && posts.length === 0 && (
                    <div className="col-span-3 bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-gray-800">No Posts Found</h2>
                        <p className="text-gray-600 mt-4">
                            Please go to your Sanity Admin Panel and publish a post to see it here.
                        </p>
                    </div>
                )}
                
                {posts && posts.length > 0 && posts.map((post, index) => (
                    // We removed the extra animate props and now pass the index 'i' to our variants
                    <motion.div 
                        key={post.slug.current} 
                        variants={cardVariants}
                        custom={index} // Pass the index to the variants for staggered delay
                    >
                        <Link to={`/post/${post.slug.current}`} className="block group bg-white rounded-lg shadow-lg overflow-hidden h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <img
                                src={post.mainImage?.asset?.url}
                                alt={post.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                    {post.title}
                                </h2>
                                <div className="flex items-center mt-4">
                                    <img src={post.authorImage} alt={post.authorName} className="w-10 h-10 rounded-full mr-4 object-cover"/>
                                    <span className="text-gray-600 font-medium">{post.authorName}</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}