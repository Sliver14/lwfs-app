import React from 'react'
// import "../style/Navbar.css";
import { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { GrMenu } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { LiaHomeSolid } from "react-icons/lia";
import { MdLiveTv } from "react-icons/md";
import { GiPlatform } from "react-icons/gi";



import logo from "../images/LWFS_LOGO.png";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
   
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    }
    
  return (
    // Navbar
    <div className='flex flex-col '>
      {/* Navbar */}
    <div className='flex flex-col w-screen bg-white fixed z-10 ' >
    
      <div className='relative flex flex-row justify-center items-center py-1 w-screen'>

        <img onClick={() => {navigate("/")}} className='h-10 cursor-pointer' src={logo} alt="lwfs_logo"/>
        
      </div>
    </div>

    {/* botoom Navbar */}
    <div className='fixed flex bottom-0 right-0 left-0 justify-center items-center p-3 bg-white shadow-lg z-20'>
      <div>
        <div className='flex gap-3'>
          <NavLink to="/" className={({isActive}) => `flex items-center  ${isActive ? "text-blue-500" : "text-black"}`}>
          <LiaHomeSolid className='text-3xl'/>
          </NavLink>

          <NavLink to="/live-tv" className={({isActive}) => `flex items-center  ${isActive ? "text-blue-500" : "text-black"}`}>
          <MdLiveTv className='text-3xl'/>
          </NavLink>
          <NavLink to="/platforms" className={({isActive}) => `flex items-center  ${isActive ? "text-blue-500" : "text-black"}`}>
          <GiPlatform className='text-3xl'/>
          </NavLink>
        </div>
        
      </div>
    </div>

  
</div>


  )
}

export default Navbar
