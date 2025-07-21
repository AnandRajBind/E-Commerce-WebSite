import React from 'react'
import logo from '/logo.webp'
import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa"
import { useEffect, useState } from 'react' // Importing useEffect for side effects in functional components

import axios from 'axios'// Importing axios for making HTTP requests
import "slick-carousel/slick/slick.css";// Importing slick carousel styles
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'; // Importing Slider from react-slick for creating carousels
import { toast } from 'react-hot-toast'; // Importing toast for displaying notifications

function Home() {
     const [courses, setCourses] = useState([]); // State to hold the courses fetched from the backend
    // axios library are used to fetch data from the backend

    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in

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
            setIsLoggedIn(false); // Setting isLoggedIn state to false
        } catch (error) {
            toast.error(error.response.data.errors || "Logout failed"); // Displaying error message using toast
            console.log("Error in logout", error);
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
            }
            catch (error) {
                console.log("Error fetching courses:", error);
            }
        };
        fetchCourses(); // Calling the function to fetch courses
    }, []);

    // Settings for the carousel using react-slick
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className="bg-gradient-to-r from-black to-blue-950">
            <div className='h-screen text-white container mx-auto '>
                {/* Header */}
                <header className='flex item-center justify-between p-6'>
                    <div className='flex  items-center space-x-2'>
                        <img src={logo} alt="image not found " className='w-10 h-10 rounded-full' />
                        <h1 className='text-orange-500 text-2xl font-bold'>CourseHaven</h1>
                    </div>
                    <div className=' space-x-4'>
                        {isLoggedIn ? (<button onClick={handleLogout} className='bg-transparent text-white py-2 px-4 border  border-white rounded '>Logout</button>
                        ) : (
                            <>
                                <Link to={'/login'} className='bg-transparent text-white py-2 px-4 border  border-white rounded '>Login</Link>
                                <Link to={'/signup'} className='bg-transparent text-white py-2 px-4 border  border-white rounded '>Signup</Link>
                            </>
                        )}
                    </div>
                </header>
                {/* Main section */}
                <section className='text-center py-12'>
                    <h1 className='text-4xl text-orange-500  font-bold '>CourseHaven</h1>
                    <br />
                    <p className='text-gray-500'>Sharpen Your Skills with Course Crafted By experts.</p>
                    <div className='space-x-4 mt-6'>
                        <Link to={'/courses'} className='bg-green-500 text-white rounded font-semibold hover:bg-white py-3 px-6 duration-300 hover:text-black '>Explore Course </Link>
                        <Link to={'https://www.codecademy.com/resources/videos'} className='bg-white text-black py-3 px-6  rounded font-semibold hover:bg-green-500 duration-300 hover:text-white '>Course Videos</Link>
                    </div>
                </section>
                <section>
                    <Slider className="" {...settings}>
                        {
                            courses.map((course) => (
                                <div key={course._id} className='p-4'>
                                    <div className='relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105'>
                                        <div className='bg-gray-900 rounded-lg overflow-hidden'>
                                            <img className='h-32 w-full object-contain' src={course.image?.url || "/default-image.png"} alt="" />
                                            <div className='p-5 text-center'>
                                                <h2 className='text-xl font-bold text-white'>{course.title}</h2>
                                                <button className='mt-2 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300'>Enroll Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </section>
                <hr />
                {/* Footer */}
                <footer className='my-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 '>
                        <div className='flex flex-col items-center md:items-start'>
                            <div className='flex  items-center space-x-2'>
                                <img src={logo} alt="image not found " className='w-10 h-10 rounded-full' />
                                <h1 className='text-orange-500 text-2xl font-bold'>CourseHaven</h1>
                            </div>
                            <div className='mt-3 ml-2 md:ml-8'>
                                <p className='mb-2'>Follow us</p>
                                <div className='flex space-x-4'>
                                    <a href=""><FaFacebook className='text-2xl hover:text-blue-400 duration-300' />
                                    </a>
                                    <a href=""><FaInstagram className='text-2xl hover:text-pink-600 duration-300' />
                                    </a>
                                    <a href=""><FaTwitter className='text-2xl hover:text-blue-600 duration-300' />
                                    </a>
                                    <a href=""><FaLinkedin className='text-2xl hover:text-blue-600 duration-300' />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='items-center flex flex-col'>
                            <h3 className='text-lg font-semibold mb-2'>connect</h3>
                            <ul className='text-gray-400 '>
                                <li className='hover:text-white cursor-pointer duration-300'>youtube- learn coading</li>
                                <li className='hover:text-white cursor-pointer duration-300'>Telegram- learn coading</li>
                                <li className='hover:text-white cursor-pointer duration-300'> Github- learn coading</li>
                            </ul>
                        </div>
                        <div className='items-center flex  flex-col'>
                            <h3 className='text-lg'>copyright &#169; 2025</h3>
                            <ul className='   text-gray-400 '>
                                <li className='hover:text-white cursor-pointer duration-300'>Terms & conditions</li>
                                <li className='hover:text-white cursor-pointer duration-300'>Privacy Policy</li>
                                <li className='hover:text-white cursor-pointer duration-300'>Refund & Cancellation</li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
export default Home