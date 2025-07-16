import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'



export const OurCourses = () => {
  const [courses, setCourses] = useState([]); // State to hold the courses fetched from the backend
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin?.token;

  if (!token) {
    toast.error("Please Login to admin");
    navigate("/admin/login");
  }


  useEffect(() => {
    // fetch courses
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
  // delete course
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4001/api/v1/course/delete${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }, withCredentials: true,
      });
      toast.success(response.data.message || "Course deleted successfully");
      const updatedCourses = courses.filter((course) => course.id !== id); // Filtering out the deleted course from the courses array

      setCourses(updatedCourses); // Updating the courses state to remove the deleted course
      console.log("Course deleted successfully:", response.data);
    } catch (error) {
      console.log("Error in deleting course:", error);
      toast.error(error.response.data.message || "Error in deleting course")
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading courses...</p>
  }

  return (
    <div className="bg-gray-100 p-8 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
      <Link
        className="bg-orange-400 py-2 px-4 rounded-lg text-white hover:bg-orange-950 duration-300"
        to={"/admin/dashboard"}
      >
        Go to dashboard
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white shadow-md rounded-lg p-4">
            {/* Course Image */}
            <img
              src={course?.image?.url}
              alt={course.title}
              className="h-40 w-full object-cover rounded-t-lg"
            />
            {/* Course Title */}
            <h2 className="text-xl font-semibold mt-4 text-gray-800">
              {course.title}
            </h2>
            {/* Course Description */}
            <p className="text-gray-600 mt-2 text-sm">
              {course.description.length > 200
                ? `${course.description.slice(0, 200)}...`
                : course.description}
            </p>
            {/* Course Price */}
            <div className="flex justify-between mt-4 text-gray-800 font-bold">
              <div>
                {" "}
                ₹{course.price}{" "}
                <span className="line-through text-gray-500">₹300</span>
              </div>
              <div className="text-green-600 text-sm mt-2">10 % off</div>
            </div>

            <div className="flex justify-between">
              <Link
                to={`/admin/update-course/${course._id}`}
                className="bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
