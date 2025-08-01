import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link} from 'react-router-dom';
import { RiHome2Fill } from 'react-icons/ri';
import { FaDiscourse, FaDownload } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';
import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { HiMenu, HiX } from "react-icons/hi"; // Icons for sidebar toggle
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils.js'; // Importing the backend URL from utilsz

function Purchases() {

    const [purchases, setPurchases] = useState([]); // State to hold the courses fetched from the backend
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
    const [errorMessage, setErrorMessage] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state


    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    console.log("purchase", purchases);
    const navigate = useNavigate();



    useEffect(() => {
         if (token) {
            setIsLoggedIn(true); // If token exists, set isLoggedIn to true
        }
        else {
            setIsLoggedIn(false); // If token does not exist, set isLoggedIn to false
        }
    }, [])
//   if (!token) {
//     navigate("/login");
//   }
    
    useEffect(() => {
        const fetchPurchases = async () => {
            if (!token) {
                setErrorMessage("Please login to buy the course");
                // navigate("/login")
                console.log(token)
                return;
            }
            try {
                const response = await axios.get(`${BACKEND_URL}/user/purchases`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true,
                    });
                setPurchases(response.data.courseData)
            } catch (error) {
                setErrorMessage("Failed to fetch purchases data");
                console.log("Error fetching purchases:", error);
            }
        };
        fetchPurchases(); // Calling the function to fetch purchases
    }, []);


    const handleLogout = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/logout`, {
                withCredentials: true,
            })
            toast.success(response.data.message); // Displaying success message using toast
            localStorage.removeItem("user"); // Removing user token from local storage
            setIsLoggedIn(false); // Setting isLoggedIn state to false
            navigate("/login")
        } catch (error) {
            console.log("Error in logout", error);
            toast.error(error.response.data.errors || "Logout failed"); // Displaying error message using toast
        }
    }
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 bg-gray-100 p-5 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
            >
                <nav>
                    <ul className="mt-16 md:mt-0">
                        <li className="mb-4">
                            <Link to="/" className="flex items-center">
                                <RiHome2Fill className="mr-2" /> Home
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/courses" className="flex items-center">
                                <FaDiscourse className="mr-2" /> Courses
                            </Link>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center text-blue-500">
                                <FaDownload className="mr-2" /> Purchases
                            </a>
                        </li>
                        <li className="mb-4">
                            <Link to="/settings" className="flex items-center">
                                <IoMdSettings className="mr-2" /> Settings
                            </Link>
                        </li>
                        <li>
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="flex items-center">
                                    <IoLogOut className="mr-2" /> Logout
                                </button>
                            ) : (
                                <Link to="/login" className="flex items-center">
                                    <IoLogIn className="mr-2" /> Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Sidebar Toggle Button (Mobile) */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? (
                    <HiX className="text-2xl" />
                ) : (
                    <HiMenu className="text-2xl" />
                )}
            </button>

            {/* Main Content */}
            <div
                className={`flex-1 p-8 bg-gray-50 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"
                    } md:ml-64`}
            >
                <h2 className="text-xl font-semibold mt-6 md:mt-0 mb-6">
                    My Purchases
                </h2>

                {/* Error message */}
                {errorMessage && (
                    <div className="text-red-500 text-center mb-4">{errorMessage}</div>
                )}

                {/* Render purchases */}
                {purchases.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {purchases.map((purchase, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-6 mb-6"
                            >
                                <div className="flex flex-col items-center space-y-4">
                                    {/* Course Image */}
                                    <img
                                        className="rounded-lg w-full h-48 object-cover"
                                        src={
                                            purchase.image?.url || "https://via.placeholder.com/200"
                                        }
                                        alt={purchase.title}
                                    />
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold">{purchase.title}</h3>
                                        <p className="text-gray-500">
                                            {purchase.description.length > 100
                                                ? `${purchase.description.slice(0, 100)}...`
                                                : purchase.description}
                                        </p>
                                        <span className="text-green-700 font-semibold text-sm">
                                            ${purchase.price} only
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You have no purchases yet.</p>
                )}
            </div>
        </div>
    );
}
export default Purchases;