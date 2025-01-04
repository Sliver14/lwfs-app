import React from 'react'
// import "../style/Navbar.css";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GrMenu } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneSquare } from "react-icons/fa";

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
    <div className='flex flex-col w-screen bg-white fixed z-10' >
      
      <div className='flex flex-col bg-lwfs1 text-white p-3' >
      <div className='flex gap-2'><MdOutlineEmail /><h5 className='text-xs font-bold'>feedback@lwfoundation.org</h5></div>

      <div className='flex gap-2'><FaPhoneSquare /><h5 className='text-xs font-bold'>+44 099 647 7484</h5></div>

      <div className='flex cursor-pointer gap-2' ><img className='w-5 h-5' src='./images/kingschat.png' alt='image'/><a className='text-xs font-bold' href='https://kingschat.online/user/lwfsch' target="_blank">Follow Us</a></div>
      </div>
    
      <div className='flex flex-row justify-between pt-1 w-screen'>
        <img onClick={() => {navigate("/")}} className='h-10 cursor-pointer' src={logo} alt="lwfs_logo"/>
        

        {/* Toggle */}
        <button className="mr-3" onClick={toggleSidebar}>
          <GrMenu className='text-3xl'/>
        </button>
      </div>
    </div>

    {/* Opened Sidebar */}
    <div className={`fixed  top-0 right-0 justify-center w-screen h-full bg-white  overflow-hidden transition ease-in-out duration-300 z-20 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

      {/* LWFS logo */}
      <div className='flex flex-row justify-between pt-1 w-full'>
          <img onClick={() => {navigate("/")}} className='h-16 cursor-pointer' src={logo} alt="lwfs_logo"/>
          
          {/* Toggle */}
          <button className="mr-3 p-2" onClick={toggleSidebar}><IoIosCloseCircleOutline  className='text-4xl' />
        </button>
      </div>

        <div className='flex flex-col h-screen mt-5' >
          <ul className='px-5 space-y-2 text-center font-bold' >
            <li className=' p-2 cursor-pointer hover:bg-slate-900 hover:text-white ' onClick={() => {toggleSidebar(); navigate("/")}}>
              HOME
            </li>
            <li className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white ' onClick={() => {toggleSidebar(); navigate("/live-tv")}}>
            LIVE-TV
            </li>
          
            <li className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white' >LWFS Store</li>
            <li className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white' >Online foundation School/Exams</li>
            <li className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white' >Testimony Bank</li>
          </ul>
        </div>
        
      </div>
  
</div>


  )
}

export default Navbar
