import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook, FaCheck, FaClipboardList, FaHandsHelping, FaExclamationCircle } from "react-icons/fa";
import './../index.css';

const BookInfoBar = () => {
  const [bookData, setBookData] = useState({
    totalBooks: 0,
    booksPresent: 0,
    booksTaken: 0,
    booksToBeReturned: 0,
    booksOnDue: 0,
    requestedCount: 0
  });

  useEffect(() => {
    // Fetch book data from the backend
    axios.get("http://localhost:5000/api/task/bookinfostatus")
      .then(response => {
        setBookData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the book data!", error);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col shadow-lg p-6 justify-center items-center rounded-[20px] border border-[#D8D8D8] bg-white">
      <div className="w-full h-full flex flex-col p-4 items-center text-center">
        <h1 className="text-[28px] font-bold mb-4">Library Books Status</h1>
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center text-[18px] text-gray-700">
            <FaBook className="mr-3 text-blue-600" />
            <span>Total Number of Books in Library</span>
            <div className="flex-grow border-t border-gray-300 mx-2"></div>
            <strong>{bookData.totalBooks}</strong>
          </div>
          <div className="flex items-center text-[18px] text-gray-700">
            <FaCheck className="mr-3 text-green-600" />
            <span>Total Number of Books at Present</span>
            <div className="flex-grow border-t border-gray-300 mx-2"></div>
            <strong>{bookData.booksPresent}</strong>
          </div>
          <div className="flex items-center text-[18px] text-gray-700">
            <FaClipboardList className="mr-3 text-yellow-600" />
            <span>Total Number of Books Taken</span>
            <div className="flex-grow border-t border-gray-300 mx-2"></div>
            <strong>{bookData.booksTaken}</strong>
          </div>
          <div className="flex items-center text-[18px] text-gray-700">
            <FaHandsHelping className="mr-3 text-purple-600" />
            <span>Total Number of Books Requested</span>
            <div className="flex-grow border-t border-gray-300 mx-4"></div>
            <strong className="text-lg">{bookData.requestedCount}</strong>
          </div>
          <div className="flex items-center text-[18px] text-gray-700">
            <FaExclamationCircle className="mr-3 text-red-600" />
            <span>Total Number of Books on Due</span>
            <div className="flex-grow border-t border-gray-300 mx-2"></div>
            <strong>{bookData.booksOnDue}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoBar;
