import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { CircularProgress, Snackbar, Alert, Tooltip } from "@mui/material";


function AdmPreviewPage() {
  const location = useLocation();
  const { bookDetails } = location.state;
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  

  async function handleDeleteSubmit() {

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    if (bookDetails.status !== "Available") {
      setSnackbarMessage('Book cannot be deleted unless it is available.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return; // Exit the function early
    }

    if (window.confirm("Are you sure you want to delete this book?")) {
    try {
      setLoading(true); // Start the loading state

      const response = await axios.delete(
        `http://localhost:5000/api/task/deletebook/${bookDetails.book_id}`
      );

      if (response.data.success) {
        setSnackbarMessage('Book deleted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        await delay(1000);
        window.location.href = "/AdmDeleteBook";
      } else {
        setSnackbarMessage('Failed to delete the book!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // End the loading state
    }
  }
}

  const isButtonDisabled = 
    bookDetails.status === "Retrun Requested" ||
    bookDetails.status === "Borrow Requested" ||
    bookDetails.status === "On Due" ||
    bookDetails.status === "Issued";
  
    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
  };
  const buttonClassNames = () => {
    let baseClasses = "bg-red-500 hover:bg-red-600 mt-2 text-white font-semibold py-3 px-6 rounded-lg transition duration-300";
    if (loading) {
      baseClasses += " bg-red-300 cursor-not-allowed";
    } else if (isButtonDisabled) {
      baseClasses += " bg-red-200 cursor-not-allowed";
    } else {
      baseClasses += " hover:bg-red-700";
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
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {bookDetails.title}
        </motion.h1>
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
      <div className="w-2/3 h-full flex flex-col pb-3 pl-1">
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

          <div className="flex justify-end pb-3">
        <Tooltip title={isButtonDisabled ? "Book was already requested by someone." : ""} arrow>
              <span>
                <button
                type="submit"
                onClick={handleDeleteSubmit}
                  disabled={isButtonDisabled || loading}
                  className={buttonClassNames()}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Return Book"}
                </button>
              </span>
            </Tooltip>
        </div>
        </motion.div>
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

export default AdmPreviewPage;
