import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import User from "./pages/User";
import LiveTv from "./pages/LiveTv";
import Navbar from './component/Navbar';
import Privacy from "./pages/Privacy";
import Footer from './component/Footer';
import PageNotFound from './component/PageNotFound';


function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/live-tv" element={<LiveTv />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
