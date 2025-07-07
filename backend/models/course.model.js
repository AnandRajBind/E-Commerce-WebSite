// Here Write the database Schema.
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a schema-based solution to model your application data. 
// it is connect to mongodb and express.
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    createrId:{
        type:mongoose.Types.ObjectId,
        ref:"User", // Reference to the User model
    }
}); 
export const Course = mongoose.model("Course", courseSchema);// CourseSchema convert in model and export it as Course.and "Course" is the name of the collection in the database.


// The model is a class that constructs documents. A document is an instance of a model.
// The model is responsible for creating and reading documents from the underlying MongoDB database.
