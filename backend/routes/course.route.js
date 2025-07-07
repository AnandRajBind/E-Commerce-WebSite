import express from 'express';
import { createCourse, updateCourse, deleteCourse, getCourses, courseDetails, buyCourses } from '../controllers/course.controller.js';

const router = express.Router();// create express router
import userMiddleware from '../middlewares/user.mid.js'; // Import user middleware for authentication
import adminMiddleware from '../middlewares/admin.mid.js'; // Import admin middleware for authorization

// The router is an instance of express.Router() that allows us to define routes for our application.
// define route for creating a course
router.post('/create', adminMiddleware, createCourse);
router.put('/update/:courseId', adminMiddleware, updateCourse);
router.delete('/delete/:courseId', adminMiddleware, deleteCourse);
router.get('/Courses', getCourses);
router.get('/:courseId', courseDetails);

router.post('/buy/:courseId', userMiddleware, buyCourses)

export default router; // Export