import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

function PreviewPage() {
  const location = useLocation();
  const { bookDetails } = location.state;
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [role, setRole] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleBorrowSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const otpResponse = await axios.post("http://localhost:5000/api/task/send_otp", {
        borrower_email: borrowerEmail,
        book_id: bookDetails.book_id,
        borrower_name: borrowerName
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
      setLoading(false);
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const otpVerifyResponse = await axios.post("http://localhost:5000/api/task/verify_otp", {
        borrower_email: borrowerEmail,
        otp,
        book_id: bookDetails.book_id
      });

      if (otpVerifyResponse.data.success) {
        setOtpVerified(true);
        setSnackbarMessage('OTP verified successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        const response = await axios.post("http://localhost:5000/api/task/request_submission", {
          book_id: bookDetails.book_id,
          borrower_name: borrowerName,
          borrower_email: borrowerEmail,
          borrow_date: borrowDate,
          return_date: returnDate,
          register_id: registerId,
          role: role,
          book_details: bookDetails 
        });

        if (response.data.success) {
          setSnackbarMessage('Request submitted successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          await delay(1000);
          navigate("/Services");
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
        onSubmit={otpSent ? handleOtpSubmit : handleBorrowSubmit}
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

            {otpSent ? (
              <div  className=' items-center flex flex-row w-full gap-3 mt-3 p-2 rounded-xl' >
                <label htmlFor="otp" className="text-lg items-center font-medium whitespace-nowrap ">Enter OTP :</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="p-2 border items-center w-full border-gray-300 rounded"
                  required
                />
                <button
                  type="submit"
                  className={`p-2 rounded bg-blue-500 whitespace-nowrap text-white w-[200px] font-bold ${loading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-700"} transition duration-200`}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className={`p-2 mt-3 rounded bg-blue-500 text-white font-bold ${loading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-700"} transition duration-200`}
                disabled={loading || isButtonDisabled}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Request and Send OTP"}
              </button>
            )}
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

export default PreviewPage;


// {notification.status === "Borrow Request" && (
//   <button
//     onClick={handleIssueBook}
//     className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 flex items-center justify-center"
//   >
//     {loading ? (
//       <CircularProgress size={24} color="inherit" />
//     ) : (
//       "Issue Book"
//     )}
//   </button>
//   <button
//   onClick={handleIssueBook}
//   className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 flex items-center justify-center"
// >
//   {loading ? (
//     <CircularProgress size={24} color="inherit" />
//   ) : (
//     "Issue Book"
//   )}
// </button>
// )}
//********************************************************* */

{/* <div className="flex justify-end">
        <motion.button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isButtonDisabled}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Borrow Book
        </motion.button>
        </div> */}