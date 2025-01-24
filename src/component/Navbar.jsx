import React from 'react'
// import "../style/Navbar.css";
import { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { GrMenu } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import logo from "../images/LWFS_LOGO.png";
import { FaAngleDown } from "react-icons/fa6";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const activeClass = "flex px-3 py-2 rounded-lg font-medium bg-opacity-90 transform duration-300 bg-lw_red text-white";
    const inactiveClass = "flex text-black px-3 py-2 rounded-lg hover:bg-[#7B7777] hover:bg-opacity-25 hover:text-black transform duration-300";
   
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
      
    }

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
    
  return (
    // Navbar
    <div className='flex flex-col '>
      {/* Navbar */}
    <div className='flex flex-col w-screen bg-white fixed z-20 ' >
    
      <div className='flex justify-between align-middle py-2 w-screen md:p-5'>
        {/* Toggle */}
        <button className="cursor-pointer p-4 text-2xl align-middle md:hidden" onClick={toggleSidebar}>
          <GrMenu/>
        </button>
        <div className='flex h-10 self-center'>
         <img onClick={() => {navigate("/")}} className='cursor-pointer' src={logo} alt="lwfs_logo"/>
        </div>

        {/* Navigation Links for Large Screens */}
        <div className="hidden md:flex items-center space-x-5 text-sm justify-center ">
            <NavLink to="/"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              onClick={() => navigate("/")}
            >
              Home
            </NavLink>

            <NavLink to="/live-tv"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              onClick={() => navigate("/live-tv")}
            >
              Live-TV
            </NavLink>

            {/* Dropdown for Platforms */}
            <div className="relative">
              <button
                onClick={toggleDropdown} 
                className="flex items-center text-black px-3 py-2 cursor-pointer"
              >
                Platforms <FaAngleDown />
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 bg-white shadow-lg mt-2 rounded-md w-48 py-2">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      navigate('/online-class');
                      setDropdownOpen(false);
                    }}
                  >
                    Online Class
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      navigate('/testimony-bank');
                      setDropdownOpen(false);
                    }}
                  >
                    Testimony Bank
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      navigate('/exams');
                      setDropdownOpen(false);
                    }}
                  >
                    Exams
                  </li>
                </ul>
              )}
            </div>

            <NavLink to="/posts"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              onClick={() => navigate("/posts")}
            >
              Posts
            </NavLink>
            
        </div>

        <div className='hidden md:flex items-center space-x-5 mr-10'>
          <h1 className='cursor-pointer'>Login</h1>
          <h1 className='cursor-pointer'>Register</h1>
        </div>

      </div>
    </div>

    

    {/* Opened Sidebar */}
    <div className={`fixed top-0 left-0 justify-center w-screen h-full bg-white overflow-hidden transition ease-in-out duration-300 z-20  ${isOpen ? "-translate-x-12" : "-translate-x-full"}`}>
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

          <li className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white ' onClick={() => {toggleSidebar(); navigate("/posts")}}>
          POSTS
          </li>
        
          <a href='' className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white' >LWFS Store</a>
          <a href='' className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white' >Online Class</a>
          <a href='' className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white' >Testimony Bank</a>
        </ul>
      </div>
    </div>
      
        
      </div>
  
</div>


  )
}

export default Navbar