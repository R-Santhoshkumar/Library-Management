import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

function AdmEditPreview() {
  const location = useLocation();
  const { bookDetails } = location.state;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...bookDetails });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    bookDetails.image ? `data:image/jpeg;base64,${bookDetails.image}` : null
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      const response = await axios.put(
        "http://localhost:5000/api/task/adm_Edit",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setIsEditing(false);
        setSnackbarMessage('Book details updated successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        await delay(1000);
      } else {
        setSnackbarMessage('Failed to update book details!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error updating book details:", error);
      setSnackbarMessage('An error occurred while updating book details!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
    finally {
      setLoading(false);
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
          {previewImage ? (
            <img
              src={previewImage}
              alt={bookDetails.title}
              className="w-full h-full object-cover"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </motion.div>
      </div>
      <div className="w-2/3 flex flex-col pl-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="title">
                  Title:
                </label>
                <motion.input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full text-lg border-b-2 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="author">
                  Author:
                </label>
                <motion.input
                  type="text"
                  name="author"
                  id="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full text-lg border-b-2 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="publisher">
                  Publisher:
                </label>
                <motion.input
                  type="text"
                  name="publisher"
                  id="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="w-full text-lg border-b-2 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="edition">
                  Edition:
                </label>
                <motion.input
                  type="text"
                  name="edition"
                  id="edition"
                  value={formData.edition}
                  onChange={handleChange}
                  className="w-full text-lg border-b-2 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="image">
                  Upload Image:
                </label>
                <motion.input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-700 border-b-2 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>
              <motion.button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Save Changes
              </motion.button>
            </form>
          ) : (
            <>
              <motion.h1
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {bookDetails.title}
              </motion.h1>
              <table className="min-w-full bg-white border border-gray-300 mb-6 rounded-lg">
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">
                      Author:
                    </td>
                    <td className="px-4 py-2">{bookDetails.author}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">
                      Publisher:
                    </td>
                    <td className="px-4 py-2">{bookDetails.publisher}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">
                      Edition:
                    </td>
                    <td className="px-4 py-2">{bookDetails.edition}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">
                      Year:
                    </td>
                    <td className="px-4 py-2">{bookDetails.year}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">
                      ISBN:
                    </td>
                    <td className="px-4 py-2">{bookDetails.isbn}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">
                      Book Id:
                    </td>
                    <td className="px-4 py-2">{bookDetails.book_id}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-semibold border-r bg-gray-100 w-1/4">
                      Status:
                    </td>
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
              <div className="flex justify-end">
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Edit Details
                </motion.button>
              </div>
            </>
          )}
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

export default AdmEditPreview;
