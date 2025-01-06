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
import { FaCompass } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";



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
    <div className='fixed flex bottom-0 right-0 left-0 justify-center items-center p-1 z-20'>
      <div className='flex flex-col bg-white rounded-full w-[95%] px-12  shadow-xl'>

        <div className='flex content-between justify-between '>
            <NavLink to="/" className={({isActive}) => `flex items-center py-2 ${isActive ? "border-2 border-white border-t-lwfs4 text-lwfs4" : "text-gray-500"}`}>
            <LiaHomeSolid className='text-3xl'/>
            </NavLink>

            <NavLink to="/live-tv" className={({isActive}) => `flex items-center py-2 ${isActive ? "border-2 border-white border-t-lwfs4 text-lwfs4" : "text-gray-500"}`}>
            <MdLiveTv className='text-3xl'/>
            </NavLink>

            <NavLink to="/platforms" className={({isActive}) => `flex items-center py-2 ${isActive ? "border-2 border-white border-t-lwfs4 text-lwfs4" : "text-gray-500"}`}>
            <FaCompass  className='text-3xl'/>
            </NavLink>

            <NavLink to="/posts" className={({isActive}) => `flex items-center py-2   ${isActive ? "border-2 border-white border-t-lwfs4 text-lwfs4" : "text-gray-500"}`}>
            <IoNotifications className='text-3xl'/>
            </NavLink>
          </div>
      </div>
        
        
    </div>

  
</div>


  )
}

export default Navbar
