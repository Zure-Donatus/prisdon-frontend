// src/components/Chatbot.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sanityClient from '../client';
import axios from 'axios';

const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d={path} />
    </svg>
);

const Icons = {
    chat: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 14.25a.75.75 0 01-.75-.75V15a.75.75 0 011.5 0v.75a.75.75 0 01-.75.75zm0-4.5a.75.75 0 01-.75-.75V11a.75.75 0 011.5 0v.25a.75.75 0 01-.75.75z",
    close: "M6 18L18 6M6 6l12 12",
    send: "M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z",
    whatsapp: "M19.722 8.384a8.216 8.216 0 00-11.623 11.624L4.5 21l1.002-3.608a8.216 8.216 0 0011.624-11.623zM12.001 2.3a9.716 9.716 0 017.34 3.793 9.716 9.716 0 01-3.792 15.05l-1.372.41-1.03 3.714-3.715-1.03-.41-1.37A9.716 9.716 0 012.3 12a9.664 9.664 0 013.792-7.34A9.664 9.664 0 0112.002 2.3zm0 4.39a.75.75 0 00-.75.75v3.61a.75.75 0 00.75.75h2.54a.75.75 0 000-1.5h-1.79V7.44a.75.75 0 00-.75-.75z",
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [siteContext, setSiteContext] = useState('');
    const [contactInfo, setContactInfo] = useState(null);

    const chatContainerRef = useRef(null);

    // Fetch all site content once when the chatbot is opened for the first time
    useEffect(() => {
        if (isOpen && !siteContext) {
            const fetchAllData = async () => {
                const query = `{"projects": *[_type == "project"], "services": *[_type == "service"], "about": *[_type == "aboutPage"][0], "settings": *[_type == "siteSettings"][0]}`;
                const data = await sanityClient.fetch(query);
                const contextString = `This is all the data from the portfolio website: ${JSON.stringify(data)}`;
                setSiteContext(contextString);
                setContactInfo(data.settings); // Save contact info for WhatsApp link
                setMessages([{ role: 'model', text: "Hello! I'm a helpful assistant. How can I help you learn about Prisdon Services?" }]);
            };
            fetchAllData();
        }
    }, [isOpen, siteContext]);

    // Auto-scroll to the bottom when new messages are added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newMessages = [...messages, { role: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        const prompt = `You are a helpful and professional assistant for Donatus Zure's freelance portfolio website, called Prisdon Services. Your name is 'Pris'. Answer questions concisely based ONLY on the context provided below. Do not make up information. If the answer is not in the context, you MUST respond with the exact phrase: "I do not have enough information to answer that question." \n\nCONTEXT: ${siteContext}\n\nUSER'S QUESTION: ${userInput}`;

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                { contents: [{ parts: [{ text: prompt }] }] }
            );

            let aiResponse = response.data.candidates[0].content.parts[0].text;

            if (aiResponse.includes("I do not have enough information")) {
                const whatsappUrl = `https://wa.me/${contactInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello, I have a question about your services: "${userInput}"`)}`;
                aiResponse = {
                    role: 'model',
                    text: "I'm sorry, I can't answer that question. Would you like to ask Donatus directly on WhatsApp?",
                    isWhatsappLink: true,
                    url: whatsappUrl,
                };
            } else {
                aiResponse = { role: 'model', text: aiResponse };
            }
            setMessages(prev => [...prev, aiResponse]);

        } catch (error) {
            console.error("Error with Gemini API:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="bg-white dark:bg-gray-800 w-80 sm:w-96 h-[500px] rounded-lg shadow-2xl flex flex-col origin-bottom-right"
                    >
                        <header className="p-4 bg-blue-900 text-white rounded-t-lg flex justify-between items-center">
                            <h3 className="font-bold">Prisdon AI Assistant</h3>
                            <button onClick={() => setIsOpen(false)} className="text-white p-2 -m-2 rounded-full hover:bg-white/20 focus:outline-none"><Icon path={Icons.close} /></button>
                        </header>
                        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-xs whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                        {msg.text}
                                        {msg.isWhatsappLink && (
                                            <a href={msg.url} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600">
                                                <Icon path={Icons.whatsapp} className="mr-2" /> Chat on WhatsApp
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && <div className="flex justify-start"><div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">...</div></div>}
                        </div>
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center">
                            <input type="text" placeholder="Ask me anything..." value={userInput} onChange={(e) => setUserInput(e.target.value)} className="w-full px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-900 dark:text-white dark:border-gray-600" />
                            <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400"><Icon path={Icons.send} /></button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(true)}
                className="bg-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-110"
                whileHover={{ scale: 1.1 }}
                animate={!isOpen ? { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } } : {}}
            >
                <Icon path={Icons.chat} className="w-8 h-8" />
            </motion.button>
        </div>
    );
}