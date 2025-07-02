import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookInfoBar from "../components/BookInfoBar";
import QuoteCarousel from "../components/QuoteCarousel";

function HomePage() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch random images from Lorem Picsum
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = [];
        // Fetch 3 random images (matching the original number)
        for (let i = 0; i < 3; i++) {
          imageUrls.push(`https://picsum.photos/800/320?random=${i}`);
        }
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  // Auto-slide effect for carousel
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
      className="w-full h-full flex flex-1 flex-row gap-4 bg-white p-4 rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Image Carousel Section */}
      <motion.div
        className="w-full h-full border rounded-2xl shadow-md border-[#D8D8D8] min-h-full flex flex-col justify-center items-center overflow-auto"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h6 className="text-xl font-semibold mb-3 text-gray-800">
          Welcome to Library Management System
        </h6>
        <motion.div
          className="w-full px-5 flex mb-5 text-lg indent-12 flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          The Library Management System (LMS) is a sophisticated web-based application crafted to enhance the operational efficiency of the library at the Department of Computer Science Engineering & Application, ABC Company. Designed with a focus on user convenience and technological innovation, this system offers a seamless digital platform for managing library resources and services. It enables users to effortlessly borrow and return books through dedicated online services, while also providing access to an extensive question bank collection to support academic and research endeavors. The LMS integrates a robust e-library feature, granting access to over 4,000 books, journals, and online databases, fostering a dynamic environment for learning and exploration. With its responsive design, smooth animated transitions, and intuitive interface, the system ensures an engaging and efficient user experience. Additionally, it connects to a backend API to manage administrative details and includes a dynamic gallery to showcase the library’s facilities.
        </motion.div>
        <motion.div
          className="relative w-full max-w-2xl h-80 bg-white rounded-xl overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {images.length > 0 && (
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Gallery ${currentIndex}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>

          {/* Left and Right Navigation Arrows */}
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
      </motion.div>

      {/* Book Info and Quote Section */}
      <motion.div
        className="w-[60%] h-full flex flex-col justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          className="w-full flex flex-1 flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <BookInfoBar />
        </motion.div>
        <br />
        <motion.div
          className="w-full h-[40%] flex flex-col shadow-md justify-center items-center italic relative bottom-0 rounded-[20px] border border-[#D8D8D8] p-5 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <QuoteCarousel />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HomePage;