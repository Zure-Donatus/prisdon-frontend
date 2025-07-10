// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import sanityClient from '../client';

import Hero from '../components/Hero.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import TestimonialsSection from '../components/TestimonialsSection.jsx'; // Import new component
import TeamSection from '../components/TeamSection.jsx';             // Import new component
import CallToActionSection from '../components/CallToActionSection.jsx';

export default function HomePage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Updated query to fetch all data for the homepage
    const query = `{
      "projects": *[_type == "project"] | order(_createdAt desc)[0...3]{
        title, description, projectUrl, mainImage{ asset->{ _id, url } }
      },
      "services": *[_type == "service"] | order(_createdAt desc)[0...3]{
        title, description, icon
      },
      "testimonials": *[_type == "testimonial"]{
        quote, author, company
      },
      "teamMembers": *[_type == "teamMember"] | order(_createdAt asc){
        name, title, bio, image{ asset->{ url } }
      }
    }`;

    sanityClient.fetch(query)
      .then((data) => {
        setPageData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading page content...</div>;
  }

  const { projects, services, testimonials, teamMembers } = pageData;

  const containerVariants = {
      hidden: {},
      visible: { transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Hero />

      {/* RECENT WORK SECTION */}
      <main className="bg-gray-100 p-4 sm:p-8 md:p-12">
        <motion.section 
            className="container mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
          <h2 className="text-4xl md:text-5xl text-gray-900 text-center font-bold mb-12">
            My Recent Work
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.map((project, index) => (
                <motion.a
                  href={project.projectUrl || '#'} target="_blank" rel="noopener noreferrer" key={index}
                  className="block group" variants={cardVariants}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3 + index * 0.5, ease: "easeInOut", repeat: Infinity }}
                >
                  <article className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                    {project.mainImage && <img src={project.mainImage.asset.url} alt={project.title} className="w-full h-48 object-cover" />}
                    <div className="p-6">
                      <h3 className="text-gray-800 text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{project.description}</p>
                    </div>
                  </article>
                </motion.a>
              ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors">
              View All Projects
            </Link>
          </div>
        </motion.section>
      </main>

      {services && services.length > 0 && <ServicesSection services={services} />}

      {/* Add the new sections here */}
      {testimonials && testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
      {teamMembers && teamMembers.length > 0 && <TeamSection teamMembers={teamMembers} />}

      <CallToActionSection />
    </>
  );
}