import React, { useState } from 'react'
import axios from 'axios'
import logo from '/logo.webp'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../utils/utils.js'; // Importing the backend URL from utils

const AdminLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);
        // console.log(e.target.value);
        // console.log(firstName, lastName, email, password);
        // sending data from frontend to backend for stored database.
        try {
            const response = await axios.post(`${BACKEND_URL}/admin/login`, {
                email,
                password,
            }, {
                withCredentials: true,
                headers: {
                    "content-Type": "application/json",
                },
            });
            console.log("Admin login Successfull", response.data);
            toast.success(response.data.message);//backend response message
             navigate("/admin/dashboard")
            localStorage.setItem("admin", JSON.stringify({
                token: response.data.token,
                user: response.data.user, // Storing user data in local storage
            }))
        } catch (error) {
            if (error.response) {
                //   alert(error.response.data.errors)  //console error:  Cannot read properties of null (reading 'password')
                setErrorMessage(error.response.data.errors || "Admin Login faild");
                // setErrorMessage("Login faild");
            }
        }
    }
    return (
        <div className="bg-gradient-to-r from-black to-blue-950 ">
            <div className="h-screen container mx-auto flex  items-center justify-center text-white">
                {/* Header */}
                <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                        <Link to={"/"} className="text-xl font-bold text-orange-500">
                            CourseHaven
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to={"/admin/signup"}
                            className="bg-transparent border border-gray-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
                        >
                            Signup
                        </Link>
                        <Link
                            to={"/courses"}
                            className="bg-orange-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
                        >
                            Join now
                        </Link>
                    </div>
                </header>

                {/* Login Form */}
                <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[500px] m-8 md:m-0 mt-20">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Welcome to <span className="text-orange-500">CourseHaven</span>
                    </h2>
                    <p className="text-center text-gray-400 mb-6">
                        Log in to access admin dashboard!
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label htmlFor="email" className=" text-gray-400 mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="name@email.com"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className=" text-gray-400 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="********"
                                    required
                                />
                                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                                    👁️
                                </span>
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="mb-4 text-red-500 text-center">
                                {errorMessage}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;