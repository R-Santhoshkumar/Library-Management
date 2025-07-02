import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

function ReturnPreviewPage() {
  const location = useLocation();
  const { bookDetails } = location.state;
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent state
  const [otp, setOtp] = useState(""); // Store OTP input
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar type
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      console.log(bookDetails);
      // Step 1: Generate and send OTP to the borrower email
      const otpResponse = await axios.post("http://localhost:5000/api/task/send_otp", {
        borrower_email: bookDetails.borrower_email,
        book_id: bookDetails.book_id, 
        borrower_name: bookDetails.borrower_name
      });

      if (otpResponse.data.success) {
        setOtpSent(true);
        setSnackbarMessage('OTP sent to your email. Please enter the OTP to confirm your request.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Failed to send OTP');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setSnackbarMessage('An error occurred while sending the OTP');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Step 2: Verify the entered OTP
      const verifyResponse = await axios.post("http://localhost:5000/api/task/verify_otp", {
        email: bookDetails.borrower_email,
        otp,
        book_id: bookDetails.book_id
      });

      if (verifyResponse.data.success) {
        // Step 3: Proceed with submitting the return request
        setOtpVerified(true);
        setSnackbarMessage('OTP verified successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        const returnRequest = {
          book_id: bookDetails.book_id,
          book_details: bookDetails // Include all book details
        };

        const response = await axios.post("http://localhost:5000/api/task/return_submission", returnRequest);

        if (response.data.success) {
          setSnackbarMessage('Return request submitted successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          await delay(1000);
          navigate("/ReturnServices");
        } else {
          setSnackbarMessage('Failed to submit request');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      } else {
        setSnackbarMessage('OTP verification failed');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setSnackbarMessage('An error occurred while verifying the OTP');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const isButtonVisible = bookDetails.status === "Issued";
  const isButtonDisabled = 
    bookDetails.status === "Borrow Requested" ||
    bookDetails.status === "Return Requested" ||
    bookDetails.status === "Available";

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
          {/* Book Details Table */}
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
          {/* Borrower Details Table */}
          <table className="min-w-full bg-white border border-gray-300 mb-6 rounded-lg">
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Borrower Name:</td>
                <td className="px-4 py-2">{bookDetails.borrower_name}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Email:</td>
                <td className="px-4 py-2">{bookDetails.borrower_email}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Register Number:</td>
                <td className="px-4 py-2">{bookDetails.register_id}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Role:</td>
                <td className="px-4 py-2">{bookDetails.role}</td>
              </tr>
              
            </tbody>
          </table>
          <motion.form
        onSubmit={otpSent ? handleOtpVerification : handleReturnSubmit}
        className="flex flex-col gap-4 pb-4 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
          >
            {otpSent ? (
              <div className='border items-center flex  w-full gap-3 border-gray-300 p-2 rounded-xl'>
                <label htmlFor="otp" className="text-lg whitespace-nowrap font-medium">Enter OTP : </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className=" p-2 border w-full border-gray-300 rounded"
                  required
                />
                <button
                  type="submit"
                  className={`p-2 rounded bg-blue-500 w-[200px] whitespace-nowrap text-white right-0 font-bold ${loading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-700"} transition duration-200`}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className={`p-2 rounded bg-blue-500 text-white font-bold ${loading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-700"} transition duration-200`}
                disabled={loading || isButtonDisabled}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Request and Send OTP"}
              </button>
            )}
          </motion.form>
          </motion.div>
          </div>   
      {/* Snackbar */}
      <Snackbar open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <button onClick={handleSnackbarClose} className="text-white">Close</button>
        }
      >
        
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default ReturnPreviewPage;
