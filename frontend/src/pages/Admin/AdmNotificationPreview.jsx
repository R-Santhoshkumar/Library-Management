import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

function AdmNotificationPreview() {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/task/notifications/${id}`
        );
        setNotification(response.data.details); // Adjust according to the response structure
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchNotification();
  }, [id]);

  if (!notification) {
    return <div>Loading...</div>;
  }
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleIssueBook = async () => {
    
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/borrow_book",
        {
          book_id: notification.book_id,
          borrow_date: notification.borrow_date,
          return_date: notification.return_date,
          borrower_name: notification.borrower_name,
          borrower_email: notification.borrower_email,
          register_id: notification.register_id,
          role: notification.role,
        }
      );

      if (response.data.success) {
        // alert("Book issued successfully!");
        setSnackbarMessage('Book Issued Successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        await delay(1000);
        navigate("/AdmHome");
      } else {
        alert("Failed to issue the book.");
      }
    } catch (error) {
      console.error("Error issuing book:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectBook = async () => {
    
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/Reject_book",
        {
          book_id: notification.book_id,
          borrow_date: notification.borrow_date,
          return_date: notification.return_date,
          borrower_name: notification.borrower_name,
          borrower_email: notification.borrower_email,
          register_id: notification.register_id,
          role: notification.role,
        }
      );

      if (response.data.success) {
        setSnackbarMessage('Book Request Rejected!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        await delay(1500);
        navigate("/AdmHome");
      } else {
        setSnackbarMessage('Failed to Reject the Request!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred while Rejecting the Request');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/return_request_approval",
        {
          book_id: notification.book_id,
          return_date: notification.return_date,
          borrower_name: notification.borrower_name,
          borrower_email: notification.borrower_email,
          register_id: notification.register_id,
          role: notification.role,
        }
      );

      if (response.data.success) {
        setSnackbarMessage('Book returned successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        await delay(1500);
        navigate("/AdmHome");
      } else {
        setSnackbarMessage('Failed to return the book.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error returning book:", error);
      setSnackbarMessage('An error occurred while Returning the book');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (notification.status === "Borrow Request") {
      handleIssueBook();
    } else if (notification.status === "Return Request") {
      handleReturnBook();
    }
  };

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
      <div className="w-1/3 flex items-center justify-center">
        <motion.div
          className="w-full h-full bg-white flex items-center justify-center overflow-hidden"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {notification.image ? (
            <img
              src={`data:image/jpeg;base64,${notification.image}`}
              alt={notification.title}
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
          {notification.title}
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
                <td className="px-4 py-2">{notification.author}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Publisher:</td>
                <td className="px-4 py-2">{notification.publisher}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Edition:</td>
                <td className="px-4 py-2">{notification.edition}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Year:</td>
                <td className="px-4 py-2">{notification.year}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">ISBN:</td>
                <td className="px-4 py-2">{notification.isbn}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Book Id:</td>
                <td className="px-4 py-2">{notification.book_id}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Status:</td>
                <td className="px-4 py-2">
                  <span
                    className={`${
                      notification.status === "Available"
                        ? "text-green-600"
                        : notification.status === "Borrow Request"
                        ? "text-orange-400"
                        : notification.status === "Return Request"
                        ? "text-orange-400"
                        : notification.status === "Issued"
                        ? "text-yellow-400"
                        : notification.status === "On Due"
                        ? "text-red-600"
                        : ""
                    } font-semibold`}
                  >
                    {notification.status}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full bg-white border border-gray-300 mb-6 rounded-lg">
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Borrower Name:</td>
                <td className="px-4 py-2">{notification.borrower_name}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Borrower Email:</td>
                <td className="px-4 py-2">{notification.borrower_email}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Role:</td>
                <td className="px-4 py-2">{notification.role}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">Register Id:</td>
                <td className="px-4 py-2">{notification.register_id}</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
        <div className="flex justify-end pb-5 mt-auto space-x-4">
          <motion.button
            onClick={handleRejectBook}
            className={`bg-red-500 hover:bg-red-600 text-white font-semibold  ${loading ? "bg-red-300 cursor-not-allowed" : "hover:bg-red-700"} py-3 px-6 rounded-lg transition duration-300`}
            disabled={loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Deny Request
          </motion.button>
          <motion.button
            onClick={handleButtonClick}
            className={`bg-green-500 hover:bg-green-600 text-white font-semibold  ${loading ? "bg-green-300 cursor-not-allowed" : "hover:bg-green-700"} py-3 px-6 rounded-lg transition duration-300`}
            disabled={loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {notification.status === "Borrow Request" ? "Issue Book" : "Return Book"}
          </motion.button>
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

export default AdmNotificationPreview;
