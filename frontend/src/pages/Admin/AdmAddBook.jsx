import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function AdmAddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [book_id, setBook_id] = useState("");
  const [edition, setEdition] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleExcelChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
  };

  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("book_id", book_id);
    formData.append("publisher", publisher);
    formData.append("edition", edition);
    formData.append("isbn", isbn);
    formData.append("year", year);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/addbooks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if (response.data.success) {
        alert("Book added successfully!");
        setTitle("");
        setAuthor("");
        setPublisher("");
        setIsbn("");
        setYear("");
        setImage(null);
        setImagePreview(null);
        navigate("/AdmAddBook")
      } else {
        alert("Failed to add the book.");
      }
    } catch (error) {
      console.error("Error adding the book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleBulkUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (excelFile) {
      formData.append("file", excelFile); // Update the key to "file" to match the backend
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/uploadbooks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if (response.data.success) {
        alert("Books uploaded successfully!");
        setExcelFile(null);
      } else {
        alert("Failed to upload the books.");
      }
    } catch (error) {
      console.error("Error uploading the books:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col bg-white rounded-2xl shadow-2xl gap-5 overflow-auto p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-semibold mb-4">Add New Book</h1>
      <form
        onSubmit={handleAddBookSubmit}
        className="border border-[#D8D8D8] p-3 rounded-2xl"
      >
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-2">
            {[
              { label: "Title", value: title, setter: setTitle, id: "title" },
              {
                label: "Author",
                value: author,
                setter: setAuthor,
                id: "author",
              },
              { label: "Book Id ", value: book_id, setter: setBook_id, id: "book_id" },
              { label: "Edition ", value: edition, setter: setEdition, id: "edition" },
              {
                label: "Publisher",
                value: publisher,
                setter: setPublisher,
                id: "publisher",
              },
              { label: "ISBN", value: isbn, setter: setIsbn, id: "isbn" },
              { label: "Year", value: year, setter: setYear, id: "year" },
            ].map(({ label, value, setter, id }) => (
              <div key={id} className="items-center flex flex-row mb-4">
                <label
                  htmlFor={id}
                  className="block text-lg font-medium w-[150px] whitespace-nowrap text-gray-700"
                >
                  {label}:
                </label>
                <input
                  type="text"
                  id={id}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            ))}
          </div>
          <div className="col-span-2">
            <div className="items-center mb-4">
              <label
                htmlFor="image"
                className="block text-lg font-medium w-[150px] whitespace-nowrap text-gray-700"
              >
                Book Cover Image:
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="mt-1 block px-3 py-2 w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Book Cover Preview"
                  className="h-60 w-auto shadow-md"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <motion.button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Book
          </motion.button>
        </div>
      </form>

      <h1 className="text-2xl font-semibold mt-10 mb-4">Bulk Upload</h1>
      <form onSubmit={handleBulkUploadSubmit} className="border border-[#D8D8D8] p-3 rounded-2xl">
        <div className="items-center mb-4">
          <label
            htmlFor="excelFile"
            className="block text-lg font-medium w-[150px] whitespace-nowrap text-gray-700"
          >
            Upload Excel File:
          </label>
          <input
            type="file"
            id="excelFile"
            onChange={handleExcelChange}
            className="mt-1 block px-3 py-2 w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end mt-4">
          <motion.button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Books
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default AdmAddBook;
