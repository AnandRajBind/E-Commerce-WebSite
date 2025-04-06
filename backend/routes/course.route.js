import express from 'express';
import { createCourse } from '../controllers/course.controller.js';

const router = express.Router();// create express router



// The router is an instance of express.Router() that allows us to define routes for our application.
// define route for creating a course
router.post('/create', createCourse);

export default router;