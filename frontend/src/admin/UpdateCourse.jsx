import React from 'react'
import {useNavigate,useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'


 export const UpdateCourse = () => {
 
const {id}=useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading]=useState("")
  const navigate=useNavigate();

  useEffect(()=>{
const fetchCourseData=async ()=>{
  try {
    const {data}=await axios.get(`http://localhost:4001/api/v1/course/${id}`,
      {
         
        withCredentials: true,
      }
    )
  
    console.log(data)
  } catch (error) {
    console.log("Error in course update", error)
  }
}

fetchCourseData();
  },[id])


  return (
    <div>UpdateCourses</div>
  )
}
