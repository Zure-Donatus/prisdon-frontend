// src/pages/SinglePost.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import sanityClient from '../client';
import BlockContent from '@sanity/block-content-to-react';

export default function SinglePost() {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams(); 

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "post" && slug.current == $slug][0]{
                title,
                _id,
                slug,
                mainImage{ asset->{ _id, url } },
                body,
                "authorName": author->name,
                "authorImage": author->image.asset->url
            }`,
            { slug }
        )
        .then(data => {
            setPostData(data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        });
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center font-bold text-2xl">Loading Post...</div>;
    }

    if (!postData) {
        return <div className="min-h-screen flex justify-center items-center font-bold text-2xl">Sorry, this post could not be found.</div>;
    }

    return (
        <main className="bg-gray-100 min-h-screen p-4 sm:p-8 md:p-12">
            <motion.article 
                className="container shadow-lg mx-auto bg-white rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <header className="relative">
                    {/* Only render the content if the data exists */}
                    {postData.title && (
                         <div className="absolute h-full w-full flex items-center justify-center p-8">
                            <div className="bg-white bg-opacity-75 rounded p-4 md:p-12 text-center">
                                <h1 className="text-3xl lg:text-5xl mb-4 font-bold">{postData.title}</h1>
                                {postData.authorName && (
                                    <div className="flex justify-center text-gray-800">
                                        {postData.authorImage && <img src={postData.authorImage} alt={postData.authorName} className="w-10 h-10 rounded-full" />}
                                        <p className="flex items-center pl-2 text-2xl">{postData.authorName}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {postData.mainImage?.asset?.url && (
                        <img
                            src={postData.mainImage.asset.url}
                            alt={postData.title || 'Blog Post Image'}
                            className="w-full object-cover rounded-t"
                            style={{ height: "400px" }}
                        />
                    )}
                </header>
                
                {/* Only render the body if it exists and is an array */}
                {postData.body && Array.isArray(postData.body) && (
                    <div className="px-4 md:px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                        <BlockContent blocks={postData.body} projectId={sanityClient.config().projectId} dataset={sanityClient.config().dataset} />
                    </div>
                )}
            </motion.article>
        </main>
    );
}