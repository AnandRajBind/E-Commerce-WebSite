// npm init -y
// npm init dotenv mongoose express 

// const express = require('express')// in the package.json file   "type": "commonjs" allow this syntax .
import express from 'express';//in the package.json file   "type": "module" allow this syntax .
import dotenv from 'dotenv';
import mongoose from 'mongoose';// mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.modgoose supports Node.js and MongoDB.  
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a schema-based solution to model your application data. Mongoose supports both promises and callbacks.
 // it is used to connect database and create schema for the data.
import courseRoute from "./routes/course.route.js";
import { use } from 'react';
// create server using express 
const app = express()
dotenv.config();

app.use(
  fileUpload({
    useTempFiles: true,
    temFileDir: "/tmp,"
  })
)

const port = process.env.PORT || 3000
app.use(express.json())

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
app.use("/api/v1/course",courseRoute);// this is the route for course

// app.get('/', (req, res) => {
//   res.send('Anand Bind')
// })


app.listen(port, () => {
  console.log(`server is running  on port ${port}`)
})
