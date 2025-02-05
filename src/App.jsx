import React from 'react';
import {useState } from 'react';
import './App.css';
import 'typeface-poppins';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import LiveTv from "./pages/LiveTv";
import Navbar from './component/Navbar';
import Privacy from "./pages/Privacy";
import Footer from './component/Footer';
import LogoSlider from './pages/LogoSlider';
import PageNotFound from './component/PageNotFound';
import Posts from './pages/Posts';
import Platforms from './pages/Platforms';
// import VerifyCode from './component/VerifyCode';
import PostPage from './pages/PostPage';
import ProtectedRoute from './utils/ProtectedRoute';
import Modal from './component/Modal';
import process from 'process';
import AdminDashboard from './pages/AdminDashboard';




function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-tv" element={<ProtectedRoute><LiveTv /></ProtectedRoute>} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/postpage" element={<PostPage/>}/>
        <Route path="/logoslider" element={<LogoSlider/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/modal" element={<Modal/>}/>
        {/* <Route path="/verifycode" element={<VerifyCode />} /> */}
        <Route path="*" element={<PageNotFound />} />
        

      </Routes>
      <Footer />
    </Router>
  )
}

export default App
