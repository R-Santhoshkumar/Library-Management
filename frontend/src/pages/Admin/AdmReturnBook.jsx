import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function AdmReturnPage() {
  const [title, setTitle] = useState("");
  const [register_id, setRegister_id] = useState("");
  const [isbn, setIsbn] = useState("");
  const [borrow_id, setBorrow_id] = useState("");
  const [name, setName] = useState("");
  const [book_id, setBook_id] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false); // State for snackbar alert

  const navigate = useNavigate();

  async function handleAdvancedSearch(e) {
    e.preventDefault();

    if (!book_id && !borrow_id && !register_id && !name ) {
      setAlertOpen(true); // Show snackbar alert
      return;
    }

    setAlertOpen(false);

    const requestData = {
      register_id,
      book_id,
      borrow_id,
      borrower_name: name,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/return_books",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);

      const data = response.data;

      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        throw new Error("Search result is not an array");
      }

      setSearchPerformed(true);
    } catch (error) {
      console.error("Error during advanced search:", error);
      setSearchPerformed(true);
      setSearchResults([]);
    }
  }

  const handleDivClick = (book) => {
    navigate("/AdmReturnPreview", { state: { bookDetails: book } });
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col bg-white rounded-2xl shadow-2xl overflow-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="h-auto w-full p-2 rounded-2xl flex flex-col justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form
          onSubmit={handleAdvancedSearch}
          className="flex flex-col gap-4 border p-3 rounded-2xl border-[#D8D8D8]"
        >
          <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Input fields */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <label htmlFor="book_id" className="text-lg w-28">
                Book Id:
              </label>
              <input
                type="text"
                id="book_id"
                placeholder="Book Id"
                className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={book_id}
                onChange={(e) => setBook_id(e.target.value)}
              />
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <label htmlFor="borrow_id" className="text-lg w-28">
                Borrow Id:
              </label>
              <input
                type="text"
                id="borrow_id"
                placeholder="Borrow Id"
                className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={borrow_id}
                onChange={(e) => setBorrow_id(e.target.value)}
              />
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <label htmlFor="register_id" className="text-lg w-28">
                Register Id:
              </label>
              <input
                type="text"
                id="register_id"
                placeholder="Register Id"
                className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={register_id}
                onChange={(e) => setRegister_id(e.target.value)}
              />
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <label htmlFor="name" className="text-lg w-28">
                Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>
          </div>

          <div className="flex justify-end">
            <motion.button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white flex font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition ease-in-out duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              Search
            </motion.button>
          </div>
        </form>

        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setAlertOpen(false)} severity="error" sx={{ width: "100%" }}>
            Please fill at least one search criterion.
          </Alert>
        </Snackbar>

        {searchPerformed && searchResults.length === 0 && (
          <div className="text-red-500 text-center mt-4">No results found</div>
        )}
        {!searchPerformed && (
          <div className="text-gray-500 text-center mt-4">
            Please enter search criteria and click the search button to find books.
          </div>
        )}
      </motion.div>

      {/* Display search results */}
      <motion.div
        className="w-full h-full flex flex-col gap-4 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        {searchResults.map((book) => (
          <motion.div
            key={book.id}
            className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-2xl border-[#D8D8D8] shadow-lg transition hover:shadow-2xl hover:border-blue-400 duration-300 ease-in-out cursor-pointer"
            onClick={() => handleDivClick(book)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.1,
              delay: 0.1 * searchResults.indexOf(book),
            }}
          >
            <div className="w-32 h-32 bg-white flex items-center justify-center overflow-hidden">
              {book.image ? (
                <img
                  src={`data:image/jpeg;base64,${book.image}`}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
            <div className="flex flex-col justify-between w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {book.title}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                <p className="text-gray-700">
                  <strong>Register Id:</strong> {book.register_id}
                </p>
                <p className="text-gray-700">
                  <strong>Borrow Id:</strong> {book.borrow_id}
                </p>
                <p className="text-gray-700">
                  <strong>Return Date:</strong> {book.return_date}
                </p>
                <p className="text-gray-700">
                  <strong>Borrower Name:</strong> {book.borrower_name}
                </p>
                <p className="text-gray-700">
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p className="text-gray-700">
                  <strong>Issue Date:</strong> {book.borrow_date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default AdmReturnPage;
