import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function ElibraryPage() {
  const [programme, setProgramme] = useState("");
  const [semester, setSemester] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [results, setResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState(""); // State to handle errors

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if at least one field is filled
    if (!programme && !semester && !course_name) {
      setAlertOpen(true);
      // setError("Please select at least one search criterion.");
      return;
    }

    setAlertOpen(false); // Clear any previous errors

    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/Question_search",
        {
          programme,
          semester,
          course_name
        }
      );

      if (response.data.success) {
        setResults(response.data.data);
        setSearchPerformed(true);
      } else {
        setResults([]);
        setSearchPerformed(true);
      }
    } catch (error) {
      console.error("Error during search:", error);
      setSearchPerformed(true);
      setResults([]);
    }
  }

  return (
    <motion.div
      className="w-full h-full flex flex-col gap-4 bg-white p-4 overflow-auto rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl font-semibold">Question Bank Management</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-4 rounded-2xl border-[#D8D8D8]"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="course_name" className="text-lg w-[280px] whitespace-nowrap">
              Course Name (or) Paper Title :
            </label>
            <input
              id="course_name"
              className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={course_name}
              onChange={(e) => setCourse_name(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="programme" className="text-lg w-32">
              Programme :
            </label>
            <select
              id="programme"
              className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={programme}
              onChange={(e) => setProgramme(e.target.value)}
            >
              <option value="" disabled>
                Select Programme
              </option>
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
              <option value="M.Sc CS">M.Sc Computer Science</option>
              <option value="M.Sc AI">M.Sc Artificial Intelligence</option>
              <option value="M.Sc DS">M.Sc Data Science</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="semester" className="text-lg w-32">
              Semester :
            </label>
            <select
              id="semester"
              className="flex-1 p-3 rounded-lg border border-[#D8D8D8] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="" disabled>
                Select Semester
              </option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
              <option value="7th Semester">7th Semester</option>
              <option value="8th Semester">8th Semester</option>
              <option value="9th Semester">9th Semester</option>
              <option value="10th Semester">10th Semester</option>
              <option value="11th Semester">11th Semester</option>
              <option value="12th Semester">12th Semester</option>
            </select>
          </div>

          <div className="flex justify-end">
            <motion.button
              type="submit"
              className="bg-blue-500 w-full justify-center items-center hover:bg-blue-700 text-white flex font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition ease-in-out duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
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
        </div>

        {error && (
          <div className="text-red-500 text-center mt-4">{error}</div>
        )}
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

      {searchPerformed && results.length === 0 && (
        <div className="text-red-500 text-center mt-4">No results found</div>
      )}

      {searchPerformed && results.length > 0 && (
        <motion.div
          className="flex flex-col "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col gap-4 mt-4">
            {results.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-2xl border-[#D8D8D8] shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex flex-col w-full">
                  <a
                    href={item.ques_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:no-underline"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.course_name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      <p className="text-gray-700">
                        <strong>Course code:</strong> {item.course_id}
                      </p>
                      <p className="text-gray-700">
                        <strong>Semester conducted:</strong> {item.sem}
                      </p>
                      <p className="text-gray-700">
                        <strong>Year:</strong> {item.year}
                      </p>
                      <p className="text-gray-700">
                        <strong>Programme :</strong> {item.programme}
                      </p>
                    </div>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ElibraryPage;
