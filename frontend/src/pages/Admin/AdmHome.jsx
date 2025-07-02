import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import BookInfoBar from "../../components/BookInfoBar";
import QuoteCarousel from "../../components/QuoteCarousel";
import "../../index.css";
import axios from "axios";

function AdmHome() {
  const [notifications, setNotifications] = useState([]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/task/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch random images from Lorem Picsum
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = [];
        // Fetch 3 random images (matching the original number)
        for (let i = 0; i < 3; i++) {
          imageUrls.push(`https://picsum.photos/600/240?random=${i}`);
        }
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
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
      className="w-full h-full flex flex-1 flex-row gap-4 justify-between bg-white p-4 rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-1/5 h-full border rounded-2xl shadow-md border-[#D8D8D8] min-h-full flex flex-col overflow-y-auto p-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No request found</p>
        ) : (
          notifications.map((notification) => (
            <Link
              to={`/notification/${notification.request_id}`}
              key={notification.request_id}
              className="w-full p-2 mb-2 border rounded-lg shadow-sm border-[#E0E0E0] flex flex-col bg-[#F9F9F9] hover:bg-[#E0F7FA] transition-colors duration-200"
            >
              <span className="font-medium">{notification.borrower_name}</span>
              <span className="text-sm text-gray-600">{notification.title}</span>
              <span className="text-xs text-gray-500">{notification.status}</span>
            </Link>
          ))
        )}
      </motion.div>

      <motion.div
        className="w-full max-w-[700px] h-full border rounded-2xl shadow-md border-[#D8D8D8] flex flex-col justify-center items-center overflow-auto scroll-smooth"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h6 className="text-xl font-semibold mb-3 text-gray-800">Welcome to Library Management System</h6>
        <motion.div
          className="w-full px-5 flex mb-5 text-lg indent-12 flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          The Library Management System (LMS) is a sophisticated web-based application crafted to enhance the operational efficiency of the library at the Department of Computer Science Engineering & Application, ABC Company. Designed with a focus on user convenience and technological innovation, this system offers a seamless digital platform for managing library resources and services. It enables users to effortlessly borrow and return books through dedicated online services, while also providing access to an extensive question bank collection to support academic and research endeavors.
        </motion.div>

        {/* Image Carousel */}
        <motion.div
          className="relative w-full max-w-[600px] h-60 mt-5 mb-5 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {images.length > 0 && (
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Gallery ${currentIndex}`}
                className="w-full h-full object-cover"
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

      <motion.div
        className="w-[470px] h-full flex flex-col justify-center items-center right-0"
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
          className="w-full h-[40%] flex flex-col shadow-md justify-center items-center relative italic bottom-0 rounded-[20px] border border-[#D8D8D8] p-5 bg-white"
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

export default AdmHome;