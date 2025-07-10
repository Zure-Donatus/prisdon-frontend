// src/components/ContactFormModal.jsx

import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// This line is important for accessibility. It tells the modal where your main app content is.
Modal.setAppElement('#root');

export default function ContactFormModal({ isOpen, onRequestClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(''); // To handle submission status

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending'); // Show a "sending" message

    try {
      // Replace 'YOUR_UNIQUE_CODE' with the code you got from Formspree
      await axios.post('https://formspree.io/f/xyzjaqlg', formData);
      setFormStatus('success'); // Show a success message
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error'); // Show an error message
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 100 },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          borderRadius: '8px',
          padding: '2rem',
          maxWidth: '500px',
          width: '90%',
        },
      }}
      contentLabel="Contact Form"
    >
      {formStatus === 'success' ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Thank You!</h2>
          <p className="mt-4 text-gray-600">Your message has been sent successfully. I will get back to you shortly.</p>
          <button onClick={onRequestClose} className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700">Close</button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Me</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 border border-gray-300 rounded-md" onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 border border-gray-300 rounded-md" onChange={handleInputChange} />
            <textarea name="message" placeholder="Your Message" rows="5" required className="w-full p-3 border border-gray-300 rounded-md" onChange={handleInputChange}></textarea>
            <div className="flex justify-end space-x-4">
                <button type="button" onClick={onRequestClose} className="py-2 px-6 text-gray-600">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
}