import React from 'react'
import logo from '/logo.webp'
import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa"

function Home() {
    const fetchCourses = () => {
        try {
            axios.get('')
        } catch (error) {
            console.log("Error fetching courses:" + error);
        }
    }
    
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
                        <Link to={'/login'} className='bg-transparent text-white py-2 px-4 border  border-white rounded '>Login</Link>
                        <Link to={'/signup'} className='bg-transparent text-white py-2 px-4 border  border-white rounded '>Signup</Link>
                    </div>


                </header>
                {/* Main section */}
                <section className='text-center py-12'>
                    <h1 className='text-4xl text-orange-500  font-bold '>CourseHaven</h1>
                    <br />
                    <p className='text-gray-500'>Sharpen Your Skills with Course Crafted By experts.</p>
                    <div className='space-x-4 mt-6'>
                        <button className='bg-green-500 text-white rounded font-semibold hover:bg-white py-3 px-6 duration-300 hover:text-black '>Explore Course </button>
                        <button className='bg-white text-black py-3 px-6  rounded font-semibold hover:bg-green-500 duration-300 hover:text-white '>Course Videos</button>
                    </div>
                </section>
                <section>Section2</section>
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