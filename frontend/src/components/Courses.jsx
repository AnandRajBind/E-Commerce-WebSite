 import axios from 'axios'// Importing axios for making HTTP requests
import React, { useState, useEffect } from "react";// Importing useEffect for side effects in functional components
 import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
// import { HiMenu, HiX } from "react-icons/hi"; // Import menu and close icons
import logo from "/logo.webp";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


function Courses() {
    const [courses, setCourses] = useState([]); // State to hold the courses fetched from the backend
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
    const [loading, setLoading] = useState(true); // State to manage loading state
    console.log("courses",courses);

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token) {
            setIsLoggedIn(true); // If token exists, set isLoggedIn to true
        }
        else {
            setIsLoggedIn(false); // If token does not exist, set isLoggedIn to false
        }
    }, [])

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:4001/api/v1/user/logout', {
                withCredentials: true,
            })
            toast.success(response.data.message); // Displaying success message using toast
           localStorage.removeItem("user"); // Removing user token from local storage
            setIsLoggedIn(false); // Setting isLoggedIn state to false
        } catch (error) {
            console.log("Error in logout", error);
            toast.error(error.response.data.errors || "Logout failed"); // Displaying error message using toast
        }
    }
    useEffect(() => {
        const fetchCourses = async () => { // Function to fetch courses from the backend API
            try {
                const response = await axios.get('http://localhost:4001/api/v1/course/courses',
                    {
                        withCredentials: true, // Sending cookies with the request
                    }
                ); // Making a GET request to the backend API to fetch courses

                console.log("Courses fetched successfully:", response.data.courses); // Logging the fetched courses to the console
                setCourses(response.data.courses); // Setting the fetched courses to the state
            setLoading(false); // Setting loading state to false after fetching courses
            }
            catch (error) {
                console.log("Error fetching courses:", error);
            }
        };
        fetchCourses(); // Calling the function to fetch courses

    }, []);


     return (
    <div className="flex">
      {/* Hamburger menu button for mobile */}
     
      {/* Sidebar */}
      <aside
        className= ""
      >
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src={logo} alt="Profile" className="rounded-full h-12 w-12" />
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-500">
                <FaDiscourse className="mr-2" /> Courses
              </a>
            </li>
            <li className="mb-4">
              <a href="/purchases" className="flex items-center">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to={"/"}
                  className="flex items-center"
                  onClick={handleLogout}
                >
                  <IoLogOut className="mr-2" /> Logout
                </Link>
              ) : (
                <Link to={"/login"} className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <main className="ml-0 md:ml-64 w-full bg-white p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold">Courses</h1>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type here to search..."
                className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
              />
              <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
                <FiSearch className="text-xl text-gray-600" />
              </button>
            </div>

            <FaCircleUser className="text-4xl text-blue-600" />
          </div>
        </header>

        {/* Vertically Scrollable Courses Section */}
        <div className="overflow-y-auto h-[75vh]">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : courses.length === 0 ? (
            // Check if courses array is empty
            <p className="text-center text-gray-500">
              No course posted yet by admin
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="rounded mb-4"
                  />
                  <h2 className="font-bold text-lg mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-xl">
                      ₹{course.price}{" "}
                      <span className="text-gray-500 line-through">5999</span>
                    </span>
                    <span className="text-green-600">20% off</span>
                  </div>

                  {/* Buy page */}
                  <Link
                    to={`/buy/${course._id}`} // Pass courseId in URL
                    className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default Courses;