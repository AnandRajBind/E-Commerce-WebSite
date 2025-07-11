import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Courses from './components/Courses'; 
import Purchases from './components/Purchases';
import Buy from './components/Buy'; 

import  { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* other routes */}
        <Route path='/courses' element={<Courses />} />
        <Route path='/Buy/:courseId' element={<Buy />} />
        <Route path='/purchases' element={<Purchases />} />
      </Routes>
       <Toaster />

    </div>
  )
}
export default App;
