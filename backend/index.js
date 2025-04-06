// const express = require('express')// in the package.json file   "type": "commonjs" allow this syntax .
import express from 'express';//in the package.json file   "type": "module" allow this syntax .
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';// mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.modgoose supports Node.js and MongoDB.  
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a schema-based solution to model your application data. Mongoose supports both promises and callbacks.
 // it is used to connect database and create schema for the data.

 
// create server using express 
const app = express()
const port = process.env.PORT || 3000

const DB_URL=process.env.MONGO_URL;

// Database connection code 
try{
 await mongoose.connect(DB_URL);
  console.log("Connected to MongoDB")

}catch(err){
  console.log(err)
}
// app.get('/', (req, res) => {
//   res.send('Anand Bind')
// })


app.listen(port, () => {
  console.log(`server is running  on port ${port}`)
})
