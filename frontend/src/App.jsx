import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Courses from './components/Courses';
import Purchases from './components/Purchases';
import Buy from './components/Buy';
import AdminSignup from './admin/AdminSignup';
import AdminLogin from './admin/AdminLogin';
import  CourseCreate  from './admin/CourseCreate';
import { UpdateCourse } from './admin/UpdateCourse';
import { OurCourses } from './admin/OurCourses';
import Dashboard from './admin/Dashboard';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });
  
  console.log("admin from state:", admin);

  return (

      <AuthProvider>
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* other routes */}
        <Route path='/courses' element={<Courses />} />
        <Route path='/Buy/:courseId' element={<Buy />} />
        <Route path='/purchases' element={user ? <Purchases /> : <Navigate to={"/login"} />} />
        {/* Admin Route  */}


        <Route path='/admin/signup' element={<AdminSignup />} />
        <Route path='/admin/login' element={<AdminLogin setAdmin={setAdmin} />} />
        <Route path='/admin/dashboard' element={admin ? <Dashboard /> : <Navigate to="/admin/login" />} />
       
        <Route path='/admin/create-course' element={<CourseCreate />} />
        <Route path='/admin/update-course/:id' element={<UpdateCourse />} />
        <Route path='/admin/our-courses' element={<OurCourses />} />
      </Routes>
      <Toaster />

    </div>
    </AuthProvider>
  )
}
export default App;
