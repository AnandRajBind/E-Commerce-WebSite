import express from 'express';
import { createCourse, updateCourse, deleteCourse, getCourses,courseDetails,buyCourses} from '../controllers/course.controller.js';
import userMiddleware from '../middlewares/user.mid.js';

const router = express.Router();// create express router



// The router is an instance of express.Router() that allows us to define routes for our application.
// define route for creating a course
router.post('/create', createCourse);
router.put('/update/:courseId', updateCourse);
router.delete('/delete/:courseId', deleteCourse);
router.get('/Courses', getCourses);
router.get('/:courseId', courseDetails);

router.post('/buy/:courseId',userMiddleware ,buyCourses)

export default router; // Export