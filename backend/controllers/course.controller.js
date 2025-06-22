// here write the business logic for course.

import {Course} from "../models/course.model.js"; // Importing the Course model to interact with the course collection in the database
export const createCourse =async (req, res) => {

  // console.log("course created");
  const { title, description, price, image } = req.body; // Destructuring the request body to get course details 

  try {
    if (!title || !description || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const courseData={
      title,
      description,
      price,
      image,
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
