import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios';

 function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
 console.log(token)
  const handlePurchase =async () => {
    if (!token) {
      toast.error("Please login to buy the course");
      navigate("/login")
      console.log(token)
      return;
    }
    try {
      setLoading(true);
      const response =await axios.post(`http://localhost:4001/api/v1/course/buy/${courseId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });
      toast.success(response.data.message || "Course purchased successfully");
      navigate('/purchases')
      setLoading(false)
    } catch (error) {
      if (error?.response?.status === 404) {
        toast.error("You have already purchased this course")
      }else{
        toast.error(error?.response?.data?.errors)
      }
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <button className='bg-blue-500 rounded-md py-2 px-4 hover:bg-blue-800 duration-300' onClick={handlePurchase} disabled={loading}>{loading ? "Processing.." : "Buy Now"}</button>
    </div>

  )
}
export default Buy;