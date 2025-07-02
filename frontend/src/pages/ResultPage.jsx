import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchResult = location.state?.searchResult || [];

  // Function to handle borrow button click
  const handleBorrowClick = (book) => {
    navigate('/BorrowRequestForm', { state: { bookDetails: book } });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white p-7 rounded-2xl shadow-xl overflow-auto">
      <h2 className="text-3xl font-bold mb-6">Search Results</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Book ID</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Title</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">ISBN</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Publisher</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Author</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Book Count</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Status</th>
            
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {searchResult.map((book, index) => (
              <tr key={book.book_id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{book.book_id}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{book.publisher}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{book.year}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{book.book_count}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center border border-gray-300">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      book.status === 'Available' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultPage;
