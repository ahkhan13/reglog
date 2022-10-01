import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Signup from './Components/Registration/Signup';
import Login from './Components/Registration/Login';
import Profile from './Components/Registration/Profile';

function App() {
  return (
    <>
                <Routes>
                    <Route  path="/" element={<Home />} />
                    <Route  path="/signup" element={<Signup/>} />
                    <Route  path="/login" element={<Login />} />
                    <Route  path="/profile" element={<Profile/>} />
                        
                </Routes>
    </>
  );
}

export default App;
