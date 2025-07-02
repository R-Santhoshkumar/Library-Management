import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { CircularProgress, Snackbar, Alert } from "@mui/material";


function AdmAddQuestions() {
  const [programme, setProgramme] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [course_id, setCourse_id] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFilePreview, setPdfFilePreview] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const handlePdfFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    setPdfFilePreview(URL.createObjectURL(file));
    setPdfFileName(file.name); // Extract and set the file name
  };

  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("programme", programme);
    formData.append("course_name", course_name);
    formData.append("course_id", course_id);
    formData.append("semester", semester);
    formData.append("year", year);
    formData.append("pdfFileName", pdfFileName); // Send the file name to the backend
    if (pdfFile) {
      formData.append("pdf", pdfFile);
    }
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/AddQuestionBank",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setProgramme("");
        setYear("");
        setCourse_id("");
        setCourse_name("");
        setSemester("");
        setPdfFile(null);
        setPdfFilePreview(null);
        setPdfFileName("");
        setSnackbarMessage('Question bank added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        await delay(1000);
        navigate("/AdmAddQuestion");
      } else {
        
        setSnackbarMessage('Failed to add the question bank!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error adding the question bank:", error);
      setSnackbarMessage('An error occurred. Please try again!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col bg-white rounded-2xl shadow-2xl gap-5 overflow-auto p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-semibold mb-4">Add New Question Bank</h1>
      <form
        onSubmit={handleAddBookSubmit}
        className="border border-[#D8D8D8] p-3 rounded-2xl"
      >
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-2">
            {[
              {
                label: "Programme ",
                value: programme,
                setter: setProgramme,
                id: "programme",
                options: ["M.Tech", "MCA", "M.Sc Computer Science", "M.Sc Artificial Intelligence", "M.Sc Data Science"], // Add your options here
              },
              {
                label: "Course Name ",
                value: course_name,
                setter: setCourse_name,
                id: "course_name",
              },
              {
                label: "Course code ",
                value: course_id,
                setter: setCourse_id,
                id: "course_id",
              },
              {
                label: "Year ",
                value: year,
                setter: setYear,
                id: "year", // Add your options here
              },
              {
                label: "Semester ",
                value: semester,
                setter: setSemester,
                id: "semester",
                options: ["1st Semester","2nd Semester","3rd Semester","4th Semester","5th Semester","6th Semester","7th Semester","8th Semester","9th Semester","10th Semester","11th Semester","12th Semester" ], // Add your options here
              },
            ].map(({ label, value, setter, id, options }) => (
              <div key={id} className="items-center text-2xl flex flex-row mb-4">
                <label
                  htmlFor={id}
                  className="block text-lg font-medium w-[200px] whitespace-nowrap text-gray-700"
                >
                  {label}:
                </label>
                {options ? (
                  <select
                    id={id}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 text-3xl rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="" disabled>
                      Select {label.toLowerCase()}
                    </option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    id={id}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                )}
              </div>
            ))}
          </div>
          <div className="col-span-2">
            <div className="items-center mb-4">
              <label
                htmlFor="pdfFile"
                className="block text-lg font-medium w-[150px] whitespace-nowrap text-gray-700"
              >
                Question Bank File (Only PDF):
              </label>
              <input
                type="file"
                id="pdfFile"
                accept=".pdf"
                onChange={handlePdfFileChange}
                className="mt-1 block p-3 w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {pdfFilePreview && (
              <div className="mt-4">
                <a
                  href={pdfFilePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Preview PDF
                </a>
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
            Add Question Bank
          </motion.button>
        </div>
      </form>
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

export default AdmAddQuestions;
