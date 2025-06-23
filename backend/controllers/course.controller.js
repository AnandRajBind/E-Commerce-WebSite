// here write the business logic for course.

import {Course} from "../models/course.model.js"; // Importing the Course model to interact with the course collection in the database
import { v2 as cloudinary } from 'cloudinary'; // Importing cloudinary for image upload and management. Cloudinary is a cloud-based service that provides an end-to-end image and video management solution, including uploading, storing, manipulating, optimizing, and delivering images and videos for web and mobile applications.

export const createCourse =async (req, res) => {

  // console.log("course created");
  const { title, description, price } = req.body; // Destructuring the request body to get course details 

  try {
    if (!title || !description || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const {image} = req.files; // Extracting the image file from the request files. This assumes that the request is made with a file upload, typically using a library like `express-fileupload` or `multer`.
    if(!req.files || Object.keys(req.files).length===0)
{
  return res.status(400).json({error:"No files Uploaded"})

}
const allowedFormat=["image/jpeg","image/png"];
if(!allowedFormat.includes(image.mimetype)){
  return res.status(400).json({error:"Invalid image format. Only jpg and png are allowed."});
}

// cloudinary upload code
const cloud_response=await cloudinary.uploader.upload(image.tempFilePath);
if(!cloud_response || !cloud_response.error){
  return res.status(400).json({error: "Error uploading image to Cloudinary"});
}

    const courseData={
      title,
      description,
      price,
      image:{
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url, 
      },
    };
    
    const course = await Course.create(courseData);// Using the Course model to create a new course document in the database.

    res.json({
      message:"Course created successfully",
      course,
    });

  }catch (error) {
    console.log(error);
    res.status(500).json({error:"Error creating course"});
  }
};
