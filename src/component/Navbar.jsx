import React from 'react'
import { Link } from 'react-router-dom';
import "../style/Navbar.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import logo from "../images/LWFS_LOGO.png";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
   
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    }

  return (
    <div className='navbar-page'>

    <div className='navbar' >
      <div className='feedback' >
        <h5>feedback@lwfoundation.org</h5>
        <h5>+44 099 647 7484</h5>
      </div>
    
      <div className='header-container'>
        <img onClick={() => {navigate("/")}} className='logo' src={logo} alt="lwfs_logo"/>
        

        {/* Toggle */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <MenuOpenIcon/> : <MenuOutlinedIcon/>}
        </button>
      </div>
    </div>

    {/* Sidebar */}
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
    <div className='header-container2'>
        <img onClick={() => {navigate("/")}} className='logo' src={logo} alt="lwfs_logo"/>
        

        {/* Toggle */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <MenuOpenIcon/> : <MenuOutlinedIcon/>}
        </button>
      </div>
      <ul className='links' >
      <li onClick={toggleSidebar}>
        <Link to="/">HOME</Link>
      </li>
      <li onClick={toggleSidebar}>
        <Link to="/live-tv">LIVE-TV</Link>
      </li>
        <li>LWFS Store</li>
        <li>Online foundation School/Exams</li>
        <li>Testimony Bank</li>
      </ul>
    </div>
  
</div>


  )
}

export default Navbar
