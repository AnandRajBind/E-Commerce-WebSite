// here write the business logic for course.
import Stripe from 'stripe';
import config from "../config.js";

import { Course } from "../models/course.model.js"; // Importing the Course model to interact with the course collection in the database
import { Purchase } from "../models/purchase.model.js"; // Importing the Purchase model to interact with the purchase collection in the database
import { v2 as cloudinary } from 'cloudinary'; // Importing cloudinary for image upload and management. Cloudinary is a cloud-based service that provides an end-to-end image and video management solution, including uploading, storing, manipulating, optimizing, and delivering images and videos for web and mobile applications.

export const createCourse = async (req, res) => {
  
  console.log("Step 1: API call received");
  const adminId = req.adminId; // Extracting the adminId from the authenticated admin user.  
  const { title, description, price } = req.body; // Destructuring the request body to get course details 
  console.log("Step 2: Data received from body =>", { title, description, price });

  try {
    if (!title || !description || !price) {
      console.log("Step 3: Validation failed - Missing fields");
      return res.status(400).json({ errors: "All fields are required" });
    }
    if (!req.files || !req.files.image) {

      // if (!req.files || Object.keys(req.files).length === 0) {
      console.log("Step 4: Image file missing", req.files);
      return res.status(400).json({ errors: "No files Uploaded" })
    }

    const { image } = req.files; // Extracting the image file from the request files. This assumes that the request is made with a file upload, typically using a library like `express-fileupload` or `multer`.
    console.log("Step 5: Image file received", image.name, image.mimetype);

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      console.log("Step 6: Invalid image format", image.mimetype);

      return res.status(400).json({ errors: "Invalid image format. Only jpg and png are allowed." });
    }

    // cloudinary upload code
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    console.log("Step 7: Cloudinary upload response", cloud_response);

    if (!cloud_response || cloud_response.error) {
      console.log("Step 8: Cloudinary error");

      return res.status(400).json({ errors: "Error uploading image to Cloudinary" });
    }
    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
      createrId: adminId
    };
    console.log("Step 9: Course data ready", courseData);

    const course = await Course.create(courseData);// Using the Course model to create a new course document in the database.
    console.log("Step 10: Course created in DB", course);

    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log("Step 11: Server error", error); console.error(error);
    res.status(500).json({ errors: "Error creating course" });
  }
}

export const updateCourse = async (req, res) => {
  const adminId = req.adminId; // Extracting the adminId from the authenticated admin user
  const { courseId } = req.params; // Extracting the courseId from the request parameters
  let { title, description, price, image } = req.body; // Destructuring the request body to get course details
  try {
    const courseSearch = await Course.findById(courseId); // Finding the course by courseId
    if (!courseSearch) {
      return res.status(404).json({ errors: "Course not found" })
    }
    const course = await Course.findOneAndUpdate({ _id: courseId, createrId: adminId }, // Finding the course by courseId and ensuring it belongs to the authenticated admin
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
      }
    )

     if (!course) {
      return res
        .status(404)
        .json({ errors: "can't update, created by other admin" });
    }
    res.status(201).json({
      message: "Course updated successfully", course
    })
  } catch (error) {
    res.status(500).json({ error: "Error in course updating" });
    console.log("Error in course updating", error);
  }
}
export const deleteCourse = async (req, res) => {
  const adminId = req.adminId; // Extracting the adminId from the authenticated admin user
  const { courseId } = req.params;
  try {
    const course = await Course.findOneAndDelete({ _id: courseId, createrId: adminId }); // Finding the course by courseId and ensuring it belongs to the authenticated admin
    if (!course) {
      return res.status(404).json({ errors: "Course not found" })
    }
    
    res.status(200).json({
      message: "Course deleted successfully",
      course
    })
  }
  catch (error) {
    res.status(500).json({ errors: "Error in course deleting" });
  }
}

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      message: "Courses fetched successfully",
      courses
    });
  } catch (error) {

    res.status(500).json({ errors: "Error fetching courses" });
    console.log("Error fetching courses", error);
  }
}
export const courseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
    res.status(200).json({ message: "Course details fetched successfully", course });

  } catch (error) {
    res.status(500).json({ errors: "Error fetching course details" });
    console.log("Error fetching course details", error);
  }
}


//  Stripe payment 

const stripe = new Stripe(config.STRIPE_SECRET_KEY); // Initializing Stripe with the secret key from the config file
console.log(config.STRIPE_SECRET_KEY);


export const buyCourses = async (req, res) => {
  const userId = req.userId; // Extracting userId from the authenticated user
  const { courseId } = req.params
  try {
    const course = await Course.findById(courseId); // Fetching the course by courseId
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
    const existingPurchase = await Purchase.findOne({ userId, courseId }); // Check if the user has already purchased the course
    if (existingPurchase) {
      return res.status(400).json({ errors: "You have already purchased this course" });
    }

 // stripe code 
  const amount=course.price;
   const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd', // Specify the currency
    payment_method_types: ['card']

    });
    // const newPurchase = new Purchase({ userId, courseId }); // Creating a new purchase record
    // await newPurchase.save(); // Saving the purchase record to the database
    res.status(200).json({ 
      message: "Course purchased successfully", 
      course,
      clientSecret: paymentIntent.client_secret
    
    });

  } catch (error) {
    res.status(500).json({ errors: 'Error in course buying' });
    console.log("Error in course buying", error);
  }
}

