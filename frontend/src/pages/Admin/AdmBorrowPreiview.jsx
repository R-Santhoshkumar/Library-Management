import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { CircularProgress, Snackbar, Alert, Tooltip } from "@mui/material";

function AdmBorrowPreview() {
  const location = useLocation();
  const { bookDetails } = location.state;
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [role, setRole] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleBorrowSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const borrowRequest = {
      book_id: bookDetails.book_id,
      borrower_name: borrowerName,
      borrower_email: borrowerEmail,
      borrow_date:borrowDate,
      return_date:returnDate,
      register_id: registerId,
      role: role,
      book_details: bookDetails // Include all book details
    };

    try {
      const response = await axios.post("http://localhost:5000/api/task/adm_borrow_book", borrowRequest);
      if (response.data.success) {
        setSnackbarMessage('Book Issued successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          await delay(1000);
        navigate("/AdmBorrowBook")
        // Additional logic after successful submission (e.g., reset form fields, redirect, etc.)
      } else {
        setSnackbarMessage('Failed to submit request');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setSnackbarMessage('An error occurred while submitting the request');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const currentDate = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(currentDate.getMonth() + 2);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}/${month}/${year}`;
    };

    setBorrowDate(formatDate(currentDate));
    setReturnDate(formatDate(twoMonthsLater));
  }, []);

  const isButtonDisabled = 
    bookDetails.status === "Requested" ||
    bookDetails.status === "On Due" ||
    bookDetails.status === "Issued";
  
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

          <motion.form
        onSubmit= {handleBorrowSubmit}
        className="flex flex-col border p-4 rounded-2xl border-[#D8D8D8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Borrow Form</h2>
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="borrowerName" className="text-lg w-38 font-semibold text-gray-800 mb-2 whitespace-nowrap">
              Borrower Name:
            </label>
            <input
              type="text"
              id="borrowerName"
              placeholder="Your name"
              required
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
            <label htmlFor="registerId" className="text-lg w-38 font-semibold pr-[46px] text-gray-800 mb-2 whitespace-nowrap">
              Register Id:
            </label>
            <input
              type="text"
              id="registerId"
              placeholder="Register Id"
              required
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
            <label htmlFor="borrowerEmail" className="text-lg w-38 font-semibold text-gray-800 mb-2 whitespace-nowrap">
              Borrower Email:
            </label>
            <input
              type="email"
              id="borrowerEmail"
              placeholder="Your email"
              required
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
            <label htmlFor="role" className="text-lg w-38 font-semibold pr-[95px] text-gray-800 mb-2 whitespace-nowrap">
              Role:
            </label>
            <select
            className="p-3 rounded-lg border border-gray-300 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="flex justify-end ">
        <Tooltip title={isButtonDisabled ? "Book was already issued to someone." : ""} arrow>
              <span>
                <button
                  type="submit"
                  disabled={isButtonDisabled || loading}
                  className={buttonClassNames()}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Issue Book"}
                </button>
              </span>
            </Tooltip>
        </div>
          </motion.form>
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

export default AdmBorrowPreview;
