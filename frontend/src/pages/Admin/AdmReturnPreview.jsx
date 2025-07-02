import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { CircularProgress, Snackbar, Alert, Tooltip } from "@mui/material";

function AdmReturnPreview() {
  const location = useLocation();
  const { bookDetails } = location.state;
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleReturnSubmit = async (e) => {
    e.preventDefault();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const returnRequest = {
      book_id: bookDetails.book_id,
      book_details: bookDetails // Include all book details
    };

    try {
      const response = await axios.post("http://localhost:5000/api/task/adm_return_book", returnRequest);
      if (response.data.success) {
        setSnackbarMessage('Book Returned successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        await delay(1000);
        navigate("/AdmReturnBook");
      } else {
        alert('Failed to submit return request');
        setSnackbarMessage('Failed to Return the Book!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        
      }
    } catch (error) {
      console.error('Error submitting return request:', error);
      alert('An error occurred while submitting the return request');
      setSnackbarMessage('An error occurred while return the book!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
    finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = 
    bookDetails.status === "Return Requested" ||
    bookDetails.status === "Borrow Requested" ||
    bookDetails.status === "On Due" ||
    bookDetails.status === "Available";
  
    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
  };
  const buttonClassNames = () => {
    let baseClasses = "bg-blue-500 hover:bg-blue-600 mt-2 text-white font-semibold py-3 px-6 rounded-lg transition duration-300";
    if (loading) {
      baseClasses += " bg-blue-300 cursor-not-allowed";
    } else if (isButtonDisabled) {
      baseClasses += " bg-blue-200 cursor-not-allowed";
    } else {
      baseClasses += " hover:bg-blue-700";
    }
    return baseClasses;
  };

  return (
    <motion.div
      className="w-full h-full flex bg-white rounded-2xl shadow-2xl overflow-auto p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-1/3 flex items-center justify-center">
        <motion.div
          className="w-full h-full bg-white flex items-center justify-center overflow-hidden"
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
      </div>
      <div className="w-2/3 flex flex-col pl-6">
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {bookDetails.title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <table className="min-w-full bg-white border border-gray-300 mb-6 rounded-lg">
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Author:</td>
                <td className="px-4 py-2">{bookDetails.author}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Publisher:</td>
                <td className="px-4 py-2">{bookDetails.publisher}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Edition:</td>
                <td className="px-4 py-2">{bookDetails.edition}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Year:</td>
                <td className="px-4 py-2">{bookDetails.year}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">ISBN:</td>
                <td className="px-4 py-2">{bookDetails.isbn}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Book Id:</td>
                <td className="px-4 py-2">{bookDetails.book_id}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Status:</td>
                <td className="px-4 py-2">
                  <span
                    className={`${
                      bookDetails.status === "Available"
                        ? "text-green-600"
                        : bookDetails.status === "Borrow Requested"
                        ? "text-orange-400"
                        : bookDetails.status === "Return Requested"
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
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full bg-white border border-gray-300 mb-6 rounded-lg">
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Borrower Name:</td>
                <td className="px-4 py-2">{bookDetails.borrower_name}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Borrower Email:</td>
                <td className="px-4 py-2">{bookDetails.borrower_email}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Role:</td>
                <td className="px-4 py-2">{bookDetails.role}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Register Id:</td>
                <td className="px-4 py-2">{bookDetails.register_id}</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
        <div className="flex justify-end pb-3">
        <Tooltip title={isButtonDisabled ? "Book was already requested by someone." : ""} arrow>
              <span>
                <button
                type="submit"
                onClick={handleReturnSubmit}
                  disabled={isButtonDisabled || loading}
                  className={buttonClassNames()}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Return Book"}
                </button>
              </span>
            </Tooltip>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={snackbarMessage}
        action={
          <button onClick={handleCloseSnackbar} className="text-white">Close</button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default AdmReturnPreview;
