import React from 'react'
import { useEffect, useState } from 'react' // Importing useEffect for side effects in functional components
import axios from 'axios'// Importing axios for making HTTP requests
function Courses() {
    const [courses, setCourses] = useState([]); // State to hold the courses fetched from the backend
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
    const [isloading, setIsLoading] = useState(true); // State to manage loading state
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
    return (
        <div>
            <h1>Courses</h1>
        </div>
    )
}
export default Courses;