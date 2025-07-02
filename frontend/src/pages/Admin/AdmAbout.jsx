import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

function AboutPage() {
  const [adminDetails, setAdminDetails] = useState({
    name: '',
    image: '',
    role: ''
  });
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch admin details (excluding image)
  useEffect(() => {
    async function fetchAdminDetails() {
      try {
        const response = await axios.get('http://localhost:5000/api/task/search-admin');
        if (response.data.success) {
          setAdminDetails({
            name: response.data.details.name,
            role: response.data.details.role,
            image: 'https://picsum.photos/300/300?random=admin' // Random profile image
          });
        } else {
          console.error('Invalid admin details');
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
        // Fallback to random image if API fails
        setAdminDetails((prev) => ({
          ...prev,
          image: 'https://picsum.photos/300/300?random=admin'
        }));
      }
    }
    fetchAdminDetails();
  }, []);

  // Fetch random gallery images from Lorem Picsum
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = [];
        for (let i = 0; i < 7; i++) {
          imageUrls.push(`https://picsum.photos/800/400?random=${i}`);
        }
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  // Auto-slide effect for gallery
  useEffect(() => {
    if (!isPaused && images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [isPaused, images]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <motion.div
      className="w-full bg-white shadow-2xl rounded-2xl p-10 mb-16"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">About Us</h1>
      <p className="text-xl text-gray-600 text-center mb-10 leading-relaxed">
        Welcome to the Library Management System were we deliver the services in a smart way. This Library Contains the some common question bank management services you can utilize of. This Site over all manages the library and question collection in online itself.
      </p>
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Mission and Vision</h2>
        <p className="text-lg text-gray-600 mb-4">
          Our mission is to provide comprehensive resources and services to support the educational and research needs of our community.
        </p>
        <p className="text-lg text-gray-600">
          Our vision is to be a leading academic library known for innovation and excellence in service.
        </p>
      </motion.div>
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Key Statistics</h2>
        <ul className="list-disc list-inside text-lg text-gray-600">
          <li>Over 4,000 books and journals</li>
          <li>Access to numerous online databases</li>
          <li>500+ students benefit from our resources annually</li>
          <li>State-of-the-art research facilities</li>
        </ul>
      </motion.div>
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Team</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <motion.div
            className="w-60 bg-gray-50 shadow-lg rounded-xl p-6 transform transition-transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={adminDetails.image}
              alt={adminDetails.name}
              className="w-full h-60 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-center text-gray-700">{adminDetails.name}</h3>
            <p className="text-lg text-center text-gray-500">{adminDetails.role}</p>
          </motion.div>
        </div>
      </motion.div>
      <h2 className="text-3xl font-semibold mb-5 text-gray-800">Gallery</h2>
      <motion.div
        className="relative mx-auto max-w-6xl bg-white shadow-lg rounded-xl p-8 mb-12 overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-[400px] overflow-hidden">
          <AnimatePresence>
            {images.length > 0 && (
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Gallery Image ${currentIndex}`}
                className="w-full h-full object-cover absolute top-0 left-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            className="bg-gray-700 text-white p-2 rounded-full z-10"
            onClick={() =>
              setCurrentIndex(
                currentIndex === 0 ? images.length - 1 : currentIndex - 1
              )
            }
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
            }}
          >
            ‹
          </button>
          <button
            className="bg-gray-700 text-white p-2 rounded-full z-10"
            onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
          >
            ›
          </button>
        </div>
      </motion.div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Developer Contact</h2>
      <motion.div
        className="mb-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="text-lg text-gray-700 mb-2">Name: <span className="font-semibold">R. Santhoshkumar</span></p>
        <p className="text-lg text-gray-700 mb-2">Email: <span className="font-semibold">abccompany@gmail.com</span></p>
        <p className="text-lg text-gray-700">Contact Number: <span className="font-semibold">0123456789</span></p>
      </motion.div>
    </motion.div>
  );
}

export default AboutPage;