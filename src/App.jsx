import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import User from "./pages/User";
import LiveTv from "./pages/LiveTv";
import Navbar from './component/Navbar';


function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/live-tv" element={<LiveTv />} />
      </Routes>
    </Router>
  )
}

export default App
