import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BACKEND_URL } from '../utils/utils.js'; // Importing the backend URL from utils


export const UpdateCourse = () => {
  const {id: courseId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`${ BACKEND_URL}/course/${courseId}`,
          {
            withCredentials: true,
          }
        )
        console.log(data);
        setTitle(data.course.title);
        setDescription(data.course.description)
        setPrice(data.course.price);
        setImagePreview(data.course.image?.url ||"");
        setLoading(false);
      } catch (error) {
        console.log(error)
        console.log("Faild to fetch course data", error)
        setLoading(false)
      }
    }
    fetchCourseData();
  }, [courseId])



  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    }
  }

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    // formData.append("image", image);
    if (image) { formData.append("image", image) }

    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin.token;
    if (!token) {
      navigate("/admin/login");
      return
    }
    try {
      const response = await axios.put(`${BACKEND_URL}/course/update/${courseId}`, formData, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      toast.success(response.data.message || "Course Updated  successfully");
      navigate("/admin/our-courses");

      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      setImagePreview("");

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.errors)
    }
  }
  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-8">Update Course</h3>
          <form onSubmit={handleUpdateCourse} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Description</label>
              <input
                type="text"
                placeholder="Enter your course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Price</label>
              <input
                type="number"
                placeholder="Enter your course price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Course Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={imagePreview ? `${imagePreview}` : "/imgPL.webp"}
                  alt="Course"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Update Course
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
