import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const dropdownItems = [
  { name: 'Borrow Book', path: '/Services' },
  { name: 'Return Book', path: '/ReturnServices' },
];

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Check if the current route is one of the dropdown routes
  const isDropdownActive = dropdownItems.some(item => item.path === location.pathname);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full h-auto flex flex-col justify-center shadow-lg sticky top-0 left-0 z-50 rounded-lg">
      <div className="w-full h-auto flex flex-row bg-top-blue justify-center">
        <div className="items-center flex flex-row w-[30%] h-auto justify-center">
          <div>
            <img src="https://picsum.photos/80/80?random=logo" alt="Library Logo" className="p-4" />
          </div>
          <div className="flex flex-col justify-center items-center pr-[105px] text-white w-full">
            <div>
              <label className="text-2xl w-full font-medium justify-center items-center">
                Library Management System
              </label>
            </div>
            <div>
              <label className="text-2xl w-full font-medium justify-center items-center">
                ABC Company
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <nav className="w-full bg-blue-800 flex justify-center py-3 shadow-lg">
          <div className="flex flex-row gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-lg font-medium border-b-2 border-white pb-1"
                  : "text-gray-300 text-lg font-medium hover:text-white hover:border-b-2 hover:border-gray-300 transition ease-in-out duration-200"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-lg font-medium border-b-2 border-white pb-1"
                  : "text-gray-300 text-lg font-medium hover:text-white hover:border-b-2 hover:border-gray-300 transition ease-in-out duration-200"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/Elibrary"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-lg font-medium border-b-2 border-white pb-1"
                  : "text-gray-300 text-lg font-medium hover:text-white hover:border-b-2 hover:border-gray-300 transition ease-in-out duration-200"
              }
            >
              E-Library
            </NavLink>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={
                  isDropdownActive
                    ? "text-white text-lg font-medium border-b-2 border-white pb-1"
                    : "text-gray-300 text-lg font-medium hover:text-white hover:border-b-2 hover:border-gray-300 transition ease-in-out duration-200"
                }
              >
                Services
              </button>
              {dropdownOpen && (
                <motion.div
                  className="absolute left-0 mt-2 bg-blue-800 text-white shadow-lg rounded-lg border border-gray-300 w-48 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {dropdownItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="block px-4 py-2 text-sm hover:bg-blue-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <NavLink to={item.path} className="w-full block">
                        {item.name}
                      </NavLink>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-lg font-medium border-b-2 border-white pb-1"
                  : "text-gray-300 text-lg font-medium hover:text-white hover:border-b-2 hover:border-gray-300 transition ease-in-out duration-200"
              }
            >
              About Us
            </NavLink>
            <div className="border border-l-white"></div>
            <NavLink
              to="/LoginPage"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-lg font-medium border-white px-1 border-b-2 pb-1"
                  : "text-gray-300 text-lg font-medium border-white px-1 hover:text-white hover:border-b-2 hover:border-gray-300 transition ease-in-out duration-200"
              }
            >
              Login
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;