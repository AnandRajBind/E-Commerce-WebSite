// here write the business logic for course.

import { Course } from "../models/course.model.js"; // Importing the Course model to interact with the course collection in the database
import { v2 as cloudinary } from 'cloudinary'; // Importing cloudinary for image upload and management. Cloudinary is a cloud-based service that provides an end-to-end image and video management solution, including uploading, storing, manipulating, optimizing, and delivering images and videos for web and mobile applications.

export const createCourse = async (req, res) => {
  console.log("Step 1: API call received");

  const { title, description, price } = req.body; // Destructuring the request body to get course details 
  console.log("Step 2: Data received from body =>", { title, description, price });

  try {
    if (!title || !description || !price) {
      console.log("Step 3: Validation failed - Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }
        if (!req.files || !req.files.image) {

    // if (!req.files || Object.keys(req.files).length === 0) {
      console.log("Step 4: Image file missing", req.files);
       return res.status(400).json({ error: "No files Uploaded" })
    }

    const { image } = req.files; // Extracting the image file from the request files. This assumes that the request is made with a file upload, typically using a library like `express-fileupload` or `multer`.
    console.log("Step 5: Image file received", image.name, image.mimetype);

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
            console.log("Step 6: Invalid image format", image.mimetype);

      return res.status(400).json({ error: "Invalid image format. Only jpg and png are allowed." });
    }
    
    // cloudinary upload code
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
        console.log("Step 7: Cloudinary upload response", cloud_response);

    if (!cloud_response || !cloud_response.error) {
            console.log("Step 8: Cloudinary error");

      return res.status(400).json({ error: "Error uploading image to Cloudinary" });
    }

    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
    };
        console.log("Step 9: Course data ready", courseData);

    const course = await Course.create(courseData);// Using the Course model to create a new course document in the database.
        console.log("Step 10: Course created in DB", course);

    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
        console.log("Step 11: Server error", error);

    console.error(error);
    res.status(500).json({ error: "Error creating course" });
  }
};


