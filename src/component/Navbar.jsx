import React from 'react'
// import "../style/Navbar.css";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GrMenu } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import logo from "../images/LWFS_LOGO.png";
import { FaAngleDown } from "react-icons/fa6";
import Modal from "../component/Modal";
import axios from 'axios';



function Navbar() {
  const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    // const PORT = "https://lwfs-app-server-production.up.railway.app";
    const PORT = "http://localhost:3001";
    const activeClass = "flex px-3 py-2 rounded-lg font-medium bg-opacity-90 transform duration-300 bg-lw_red text-white";
    const inactiveClass = "flex text-black px-3 py-2 rounded-lg hover:bg-[#7B7777] hover:bg-opacity-25 hover:text-black transform duration-300";


    // const handleLiveTv = async () => {
    //   const token = Cookies.get("authToken");
    //   console.log("Authtoken:", token);
    
    //   if (!token) {
    //     console.error("No token found in cookies!");
    //     setLoggedIn(false); // No token, user is not logged in
    //     return;
    //   }
      
    
    //   try {
    //     // Ensure headers are sent as part of the Axios configuration
    //     const response = await axios.post(
    //       `${PORT}/auth/verify`,
    //       {}, // Empty body
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`, // Pass the token here
    //         },
    //       }
    //     );
    
    //     if (response.status === 200) {
    //       setLoggedIn(true);
    //       // Redirect or show live TV page
    //       navigate("/live-tv");
    //     }
    //   } catch (error) {
    //     console.error("Token verification failed:", error);
    //     setLoggedIn(false);
    //   }
    // };

    const logout = () => {
        // Remove the authToken cookie
      Cookies.remove("authToken");
      window.location.reload();
    
      // Optionally, reset any state related to authentication
      // setIsModalOpen(true);
      }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  useEffect(()=>{
     const token = Cookies.get('authToken');
        if (token) {
          setLoggedIn(true); // Close the modal
        } else {
          setLoggedIn(false);
        }
  })
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
              onClick={()=> navigate("/live-tv")}
            >
              Live - TV
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
                  <a href='https://online.lwfoundationschool.org/'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate('/online-class');
                        setDropdownOpen(false);
                      }}
                    >
                      Online Class
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/testimonybank/'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate('/testimony-bank');
                        setDropdownOpen(false);
                      }}
                    >
                      Testimony Bank
                    </li>
                  </a>
                  
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      navigate('/exams');
                      setDropdownOpen(false);
                    }}
                  >
                    LWFS Store
                  </li>

                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    Portal
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

            <NavLink to="/contact"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              onClick={() => navigate("/contact")}
            >
              Contact
            </NavLink>
            
        </div>
        <div className='hidden md:flex'>
        {!loggedIn ?<div className='hidden md:flex items-center space-x-5 mr-10'>
          <h1 className='cursor-pointer'>Login</h1>
          <h1 className='cursor-pointer'>Register</h1>
        </div> : <div>
          <h1>Username</h1>
          <button onClick={logout} className='px-8 py-2 bg-lw_blue text-white'>Logout</button>
          </div> }
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
        <ul className='px-5 space-y-2 ' >
          <li className=' p-2 cursor-pointer hover:bg-slate-900 hover:text-white ' onClick={() => {toggleSidebar(); navigate("/")}}>
            Home
          </li>
          <li className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white ' onClick={() => {toggleSidebar(); navigate("/live-tv")}}>
          Live TV
          </li>
          
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
                  <a href='https://online.lwfoundationschool.org/'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate('/online-class');
                        setDropdownOpen(false);
                      }}
                    >
                      Online Class
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/testimonybank/'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate('/testimony-bank');
                        setDropdownOpen(false);
                      }}
                    >
                      Testimony Bank
                    </li>
                  </a>
                  
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    LWFS Store
                  </li>

                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    Portal
                  </li>
                </ul>
              )}
            </div>

          <li className='p-2 cursor-pointer hover:bg-slate-900 hover:text-white ' onClick={() => {toggleSidebar(); navigate("/posts")}}>
          Posts
          </li>
          
        </ul>
        
        
        
        
      </div>
      <div className='flex absolute bottom-5 left-1/2'>
        {!loggedIn ? <h1>Signin/Register</h1> : <button className='absolute cursor-pointer bg-lw_dark_blue text-white w-40 px-10 py-2 rounded-md self-center bottom-5' onClick={logout}>Logout</button>}
        </div>
      
    </div>
      
        
      </div>
  
</div>


  )
}

export default Navbar