import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function AdmPreviewPage() {
  const location = useLocation();
  const { bookDetails } = location.state;
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [role, setRole] = useState("");

  const handleBorrowSubmit = (e) => {
    e.preventDefault();
    // Handle the borrow request form submission
  };

  const isButtonDisabled = 
    bookDetails.status === "Requested" ||
    bookDetails.status === "On Due" ||
    bookDetails.status === "Issued";

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
              style={{ objectFit: 'contain' }} // Adjust this if needed
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
      </div>
      <motion.form
        onSubmit={handleBorrowSubmit}
        className="flex flex-col gap-4 border p-4 rounded-2xl border-[#D8D8D8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Borrow Request</h2>
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="borrowerName" className="text-lg w-38 font-semibold text-gray-800  mb-2">
              Borrower Name:
            </label>
            <input
              type="text"
              id="borrowerName"
              placeholder="Your name"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="borrowerEmail" className="text-lg w-38 font-semibold text-gray-800 mb-2">
              Borrower Email:
            </label>
            <input
              type="email"
              id="borrowerEmail"
              placeholder="Your email"
              value={borrowerEmail}
              onChange={(e) => setBorrowerEmail(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="registerId" className="text-lg w-38 font-semibold pr-[46px] text-gray-800 mb-2">
              Register Id:
            </label>
            <input
              type="text"
              id="registerId"
              placeholder="Register Id"
              value={registerId}
              onChange={(e) => setRegisterId(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="role" className="text-lg w-38 font-semibold pr-[99px] text-gray-800 mb-2">
              Role:
            </label>
            <select
              className=" flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
            </select>
          </motion.div>
        </div>
        <motion.div
          className="flex justify-end mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition ease-in-out duration-300 ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Submit Borrow Request
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default AdmPreviewPage;
