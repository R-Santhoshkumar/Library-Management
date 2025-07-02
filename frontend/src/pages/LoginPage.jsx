import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (response.data.success) {
        let token = response.data.token;
        // Store the JWT token in localStorage
        localStorage.setItem("token", token);

        toast.success("Login successful!");
        navigate("/AdmHome");
      } else {
        toast.error("Username or password is incorrect!");
      }
    } catch (error) {
      toast.error("An error occurred, please try again.");
    }
  }

  return (
    <div className="w-full h-full flex flex-1 justify-center items-center bg-white p-7 rounded-2xl shadow-2xl">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Login</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-lg mb-2 text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg mb-2 text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                name="password"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              value="Submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default LoginPage;
