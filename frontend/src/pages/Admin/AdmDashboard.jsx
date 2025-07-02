import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement
);

const AdmDashboard = () => {
  const [data, setData] = useState({
    bookIdData: { CS: 0, A: 0, R: 0 },
    statusData: { available: 0, issued: 0, onDue: 0 },
    programmeData: {},
    semesterData: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/task/dashboard-data");
        const result = await response.json();
  
        if (result.success) {
          const { bookIdData, statusData, programmeData, semesterData } = result.data;
  
          setData({
            bookIdData: bookIdData || { CS: 0, A: 0, R: 0 },
            statusData: statusData || { available: 0, issued: 0, onDue: 0 },
            programmeData: programmeData || {},
            semesterData: semesterData || {},
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const bookIdChartData = {
    labels: Object.keys(data.bookIdData),
    datasets: [
      {
        label: "Book Series",
        data: Object.values(data.bookIdData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const statusChartData = {
    labels: ["Available", "Issued", "On Due"],
    datasets: [
      {
        label: "Book Status",
        data: Object.values(data.statusData),
        backgroundColor: ["#4BC0C0", "#FF9F40", "#FF6384"],
      },
    ],
  };

  const programmeChartData = {
    labels: Object.keys(data.programmeData),
    datasets: [
      {
        label: "Question Banks by Programme",
        data: Object.values(data.programmeData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const semesterChartData = {
    labels: Object.keys(data.semesterData),
    datasets: [
      {
        label: "Question Banks by Semester",
        data: Object.values(data.semesterData),
        backgroundColor: ["#FF9F40", "#FF6384", "#36A2EB", "#4BC0C0"],
      },
    ],
  };

  const combinedChartData = {
    labels: ["CS", "A", "R"],
    datasets: [
      {
        type: "bar",
        label: "Book Series",
        data: Object.values(data.bookIdData),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Book Status",
        data: Object.values(data.statusData),
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl shadow-2xl overflow-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 border border-[#D8D8D8] rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Book Series Distribution
          </h3>
          <div className="w-full flex flex-row items-center justify-evenly h-56">
            <Pie
              data={bookIdChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
            <div className="mt-4 text-gray-700">
              {Object.entries(data.bookIdData).map(([series, count]) => (
                <p key={series}>
                  {series} Series: {count} books
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-[#D8D8D8] rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Book Status Distribution
          </h3>
          <div className="w-full flex flex-row items-center justify-evenly h-56">
            <Pie
              data={statusChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
            <div className="mt-4 text-gray-700">
              {Object.entries(data.statusData).map(([status, count]) => (
                <p key={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}: {count}{" "}
                  books
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-[#D8D8D8] rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Question Banks by Programme
          </h3>
          <div className="w-full flex flex-row items-center justify-evenly h-56">
            <Pie
              data={programmeChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
            <div className="mt-4 text-gray-700">
              {Object.entries(data.programmeData).map(([programme, count]) => (
                <p key={programme}>
                  {programme}: {count} question banks
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-[#D8D8D8] rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Question Banks by Semester
          </h3>
          <div className="w-full flex flex-row items-center justify-evenly h-56">
            <Pie
              data={semesterChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
            <div className="mt-4 text-gray-700">
              {Object.entries(data.semesterData).map(([semester, count]) => (
                <p key={semester}>
                  Semester {semester}: {count} question banks
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 bg-white p-4 border border-[#D8D8D8] rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Combined Data
          </h3>
          <div className="w-full h-80">
            <Bar
              data={combinedChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmDashboard;
