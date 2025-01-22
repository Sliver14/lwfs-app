import React from 'react'
// import "../style/Navbar.css";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GrMenu } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";


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
      
      {/* <div className='flex flex-col bg-lwfs1 text-white p-3 gap-2' >
      <div className='flex gap-2 cursor-pointer'><MdOutlineEmail /><h5 className='text-xs font-bold'>info@lwfoundationschool.com</h5></div>

      <div className='flex gap-2 cursor-pointer'><FiPhoneCall /><h5 className='text-xs font-bold'>+234 80 3502 4986</h5></div>

      <div className='flex cursor-pointer gap-2' ><img className='w-5 h-5' src='./images/kingschat.png' alt='image'/><a className='text-xs font-bold' href='https://kingschat.online/user/lwfsch' target="_blank">Follow Us</a></div>
      </div> */}
    
      <div className='flex justify-between align-middle py-2 w-screen'>
        {/* Toggle */}
        <button className="cursor-pointer p-4 text-2xl align-middle " onClick={toggleSidebar}>
          <GrMenu/>
        </button>
        <div className='flex h-10 mr-5 self-center'>
         <img onClick={() => {navigate("/")}} className='cursor-pointer' src={logo} alt="lwfs_logo"/>
        </div>
      </div>

    </div>

    {/* Opened Sidebar */}
    <div className={`fixed  top-0 left-0 justify-center w-screen h-full bg-white  overflow-hidden transition ease-in-out duration-300 z-20  ${isOpen ? "-translate-x-12" : "-translate-x-full"}`}>
    <div className='flex flex-col w-screen ml-9'>

    <div className='flex flex-row w-full' onClick={toggleSidebar} >
                    
        {/* Toggle */}
        <button className="ml-3 p-5" ><IoMdClose />
      </button>
    </div>

      <div className='flex flex-col h-screen' >
        <ul className='px-5 space-y-2 text-lg' >
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
  
</div>


  )
}

export default Navbar