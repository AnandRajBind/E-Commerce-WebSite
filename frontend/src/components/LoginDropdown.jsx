import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoLogIn } from 'react-icons/io5'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

const LoginDropdown = ({ className = "", buttonText = "Login", showIcon = true }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const closeDropdown = () => {
        setIsOpen(false)
    }

    return (
        <div className="relative z-50">
            {/* Dropdown Button */}
            <button 
                onClick={toggleDropdown}
                className={`flex items-center space-x-2 ${className}`}
            >
                {showIcon && <IoLogIn className="mr-2" />}
                <span>{buttonText}</span>
                {isOpen ? <IoChevronUp className="ml-1" /> : <IoChevronDown className="ml-1" />}
            </button>
            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-[60] md:right-0 sm:right-0">
                    <div className="py-2">
                        <Link 
                            to="/login"
                            onClick={closeDropdown}
                            className="block px-4 py-3 text-gray-800 hover:bg-blue-50 transition-colors duration-200"
                        >
                            <div className="flex items-center">
                                <IoLogIn className="mr-3 text-blue-500" />
                                <div>
                                    <div className="font-medium">User Login</div>
                                    <div className="text-xs text-gray-500">Access courses and purchases</div>
                                </div>
                            </div>
                        </Link>
                        
                        <hr className="my-1 border-gray-200" />
                        
                        <Link 
                            to="/admin/login"
                            onClick={closeDropdown}
                            className="block px-4 py-3 text-gray-800 hover:bg-orange-50 transition-colors duration-200"
                        >
                            <div className="flex items-center">
                                <IoLogIn className="mr-3 text-orange-500" />
                                <div>
                                    <div className="font-medium">Admin Login</div>
                                    <div className="text-xs text-gray-500">Manage courses and dashboard</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            {/* Click outside to close */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[55]" 
                    onClick={closeDropdown}
                ></div>
            )}
        </div>
    )
}

export default LoginDropdown