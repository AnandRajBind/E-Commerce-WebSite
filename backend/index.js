// npm init -y
// npm init dotenv mongoose express 

// const express = require('express')// in the package.json file   "type": "commonjs" allow this syntax .
import express from 'express';//in the package.json file   "type": "module" allow this syntax .
import dotenv from 'dotenv';
import mongoose from 'mongoose';// mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.modgoose supports Node.js and MongoDB.
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a schema-based solution to model your application data. Mongoose supports both promises and callbacks.
 // it is used to connect database and create schema for the data.
 import { v2 as cloudinary } from 'cloudinary';
 import courseRoute from "./routes/course.route.js";
 import userRoute from "./routes/user.route.js";
  import adminRoute from "./routes/admin.route.js";
 import fileUpload from 'express-fileupload';
 // create server using express 
import cookieParser from 'cookie-parser';// cookie-parser is a middleware that parses cookies attached to the client request object.
// it is used to parse the cookies in the request and make them available in the request object



const app = express()
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());// this is used to parse the cookies in the request and make them available in the request object

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);
const port = process.env.PORT || 3000
const DB_URL=process.env.MONGO_URL;

// Database connection code 
try{
 await mongoose.connect(DB_URL);
  console.log("Connected to MongoDB")
}
catch(err){
  console.log(err)
}
// defining routes
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin",adminRoute);
// this is the route for course
// Cloudinary configuration code 
 cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key,
        api_secret: process.env.api_secret 
    });

app.listen(port, () => {
  console.log(`server is running  on port ${port}`)
})
