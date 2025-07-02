import React from "react";
import { motion } from "framer-motion";

function BookDetails({ bookDetails, button }) {
  return (
    <motion.div
      className="w-full h-full flex flex-col bg-white rounded-2xl shadow-2xl overflow-auto p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full flex flex-col items-center">
        <motion.div
          className="w-64 h-64 bg-white flex items-center justify-center overflow-hidden mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {bookDetails.image ? (
            <img
              src={`data:image/jpeg;base64,${bookDetails.image}`}
              alt={bookDetails.title}
              className="w-full h-full object-cover"
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </motion.div>
        <motion.h1
          className="text-3xl font-bold mb-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {bookDetails.title}
        </motion.h1>
        <motion.p
          className="text-lg mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {bookDetails.author}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
          <motion.p
            className="text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>Publisher:</strong> {bookDetails.publisher}
          </motion.p>
          <motion.p
            className="text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>Edition:</strong> {bookDetails.edition}
          </motion.p>
          <motion.p
            className="text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>Year:</strong> {bookDetails.year}
          </motion.p>
          <motion.p
            className="text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>ISBN:</strong> {bookDetails.isbn}
          </motion.p>
          <motion.p
            className="text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>Book Id:</strong> {bookDetails.book_id}
          </motion.p>
          <motion.p
            className="text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>Status:</strong>{" "}
            <span
              className={`${
                bookDetails.status === "Available"
                  ? "text-green-600"
                  : bookDetails.status === "Requested"
                  ? "text-orange-400"
                  : bookDetails.status === "Issued"
                  ? "text-yellow-400"
                  : bookDetails.status === "On Due"
                  ? "text-red-600"
                  : ""
              } font-semibold`}
            >
              {bookDetails.status}
            </span>
          </motion.p>
          <motion.p
            className="text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>Book Count:</strong> {bookDetails.book_count}
          </motion.p>
        </div>
        {button && (
          <motion.button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {button.label}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default BookDetails;
