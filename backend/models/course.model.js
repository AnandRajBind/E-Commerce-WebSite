// Here Write the database Schema.
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a schema-based solution to model your application data. 
import mongoose from "mongoose";

const courseSchema = new  mongoose.Schema({


    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
       type:Number,
         required:true, 
    },
    image:{
type:String,
required:true,
    }
});


// The model is a class that constructs documents. A document is an instance of a model.
// The model is responsible for creating and reading documents from the underlying MongoDB database.

export const Course= mongoose.model("Course", courseSchema);// CourseSchema convert in model and export it as Course.and "Course" is the name of the collection in the database.