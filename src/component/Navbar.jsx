import React from 'react'
// import "../style/Navbar.css";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GrMenu } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import logo from "../images/LWFS_LOGO.png";
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import Modal from "../component/Modal";
import axios from 'axios';

function Navbar() {
  const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdown2Open] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const activeClass = "flex px-3 py-2 rounded-lg font-medium bg-opacity-90 transform duration-300 bg-lw_red text-white";
    const inactiveClass = "flex text-black px-3 py-2 rounded-lg hover:bg-gray-300 hover:bg-opacity-25 hover:text-black transform transform ease-out duration-300 hover:scale-95";
    const [user, setUser] = useState("");
    const [groupParticipation, setGroupParticipation] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);
    const navRef = useRef(null);
    const nav2Ref = useRef(null);
    const sidebarRef = useRef(null); // For sidebar menu
    const proRef = useRef(null);
    const [profile, setProfile] = useState(false);
    const name = "React";
    const [letsLogin, setLetsLogin] = useState(false);

  // Function to handle clicks outside the nav
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (nav2Ref.current && !nav2Ref.current.contains(event.target)) { // Fix: Correct ref usage
        setDropdown2Open(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest(".toggle-btn")) { 
        setIsOpen(false); 
      }
      if (proRef.current && !proRef.current.contains(event.target)) {
        setProfile(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


    useEffect(()=>{
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`${apiUrl}/auth/verify`, {
            withCredentials: true, // Ensure proper spelling
          });
          setUser(response.data.user);
          setLoggedIn(true);
          console.log(user.id);
          
        } catch (error) {
          console.error('Verification failed:', error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    },[])

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
 

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
      
    }

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    const toggleDropdown2 = () => {
      setDropdown2Open(!dropdownOpen2);
    };

    const profileToggle = () => {
      setProfile(!profile)
    }

    const updateAttendance = async (e) => {
      e.preventDefault();
      try{

        const response = await axios.post(`${apiUrl}/live-tv/update`, { groupParticipation }, {
          withCredentials: true, // Include user token from cookies
        });
      } catch(error){

      }
    }
    

  return (
    // Navbar
    <div className='relative flex flex-col '>
      
      {/* Modal */}
     {letsLogin && <Modal isOpen={letsLogin} onClick={() =>setLetsLogin(true) } />} 

      {/* Navbar */}
    <div className='flex flex-col w-screen bg-white fixed top-0 z-20 shadow-md' >
    
      <div className='flex justify-between align-middle py-2 pl-2 pr-5 w-screen md:pr-10 md:pl-5 lg:px-10'>
        {/* Toggle */}
        <button className="cursor-pointer px-4 text-2xl align-middle lg:hidden" onClick={toggleSidebar}>
          <GrMenu/>
        </button>
        <div className='flex h-10 self-center'>
         <img onClick={() => {navigate("/")}} className='cursor-pointer' src={logo} alt="lwfs_logo"/>
        </div>

        {/* Navigation Links for Large Screens */}
        <div className="hidden lg:flex items-center space-x-5 text-sm justify-center ">
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
              Live - TV
            </NavLink>

            {/* Laptop Dropdown for Platforms */}
            <div ref={navRef} className="relative transition transform duration-200 ease-out">
              <button
                onClick={toggleDropdown} 
                className="flex items-center text-black px-3 py-2 cursor-pointer"
              >
                Platforms <FaAngleDown />
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 bg-white shadow-lg mt-2 rounded-md w-48 py-2 ">
                  <a href='https://online.lwfoundationschool.org/'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      Online Class
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/testimonybank/' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      Testimony Bank
                    </li>
                  </a>
                  
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    LWFS Store
                  </li>

                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"

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
        <div ref={proRef} className='hidden lg:flex'>
        {!loggedIn ? <div className='hidden lg:flex items-center space-x-5 mr-10'>
          <h1 onClick={()=> navigate("/modal")} className='cursor-pointer'>Login/Register</h1>
        </div> : <div className='flex items-center'>
          <h1 className='cursor-pointer text-sm flex items-center gap-1' onClick={profileToggle}>{user?.firstName} {user?.lastName}<FaAngleDown/></h1>
          
          {profile && <>
            <div className='absolute top-[60px] right-5 flex items-center shadow-md  text-red-600 bg-white p-5 z-20  transition translate duration-150'>
              <div className='flex rounded-md text-lw_red items-center'>
                <AiOutlineLogout className='cursor-pointer' onClick={logout} />
                <button className='cursor-pointer' onClick={logout} >Logout</button>
              </div>
              
            </div>
          </>}
          </div> }
        </div>
        
        

      </div>
    </div>
    
    
    {/* Mobile Opened Sidebar */}
    <div ref={sidebarRef} className={`fixed top-0 left-0 justify-center w-screen h-full bg-white overflow-hidden transition ease-in-out duration-300 z-20  ${isOpen ? "-translate-x-12" : "-translate-x-full"}`}>
    <div className='flex flex-col w-screen ml-9'>
            
    {/* Mobile Toggle */}
    <div className='flex flex-row w-full align-middle justify-between p-5 pr-10 items-center' >
      <div className='flex gap-2 text-xs'>
        <div className='flex flex-col bg-gray-900 text-xl font-bold rounded-full text-white self-center  w-12 h-12 items-center justify-center '>{user?.lastName ? user.lastName.charAt(0) : ''} {user?.firstName ? user?.firstName.charAt(0) : ''}</div> 
        <h1 className='cursor-pointer text-sm flex items-center gap-1' onClick={profileToggle}>{user?.firstName} {user?.lastName}</h1> 
      </div>   
      <button onClick={toggleSidebar} className="ml-3 p-5" ><IoMdClose />
      </button>
    </div>

      <div className='flex flex-col h-screen' >
        <ul className='px-5 space-y-2 ' >
          <li className=' p-2 cursor-pointer transition transform ease-out duration-200 hover:scale-95 hover:bg-gray-100 ' onClick={() => {toggleSidebar(); navigate("/")}}>
            Home
          </li>
          <li className='p-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95' onClick={() => {toggleSidebar(); navigate("/live-tv")}}>
          Live TV
          </li>
          
          {/* Mobile Dropdown for Platforms*/}
          <div ref={nav2Ref} className="relative z-50">
              <button
                onClick={toggleDropdown2} 
                className="flex items-center text-black px-3 py-2 cursor-pointer"
              >
                Platforms <FaAngleDown />
              </button>
              {dropdownOpen2 && (
                <ul className="absolute left-0 bg-white shadow-lg mt-2 rounded-md w-48 py-2">
                  <a href='https://online.lwfoundationschool.org/' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                      onClick={() => {
                        setDropdown2Open(false);
                      }}
                    >
                      Online Class
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/testimonybank/' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      Testimony Bank
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/store/' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                    >
                      LWFS Store
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/login' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                    >
                      Portal
                    </li>
                  </a>
                  
                </ul>
              )}
            </div>

          <li className='p-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95' onClick={() => {toggleSidebar(); navigate("/posts")}}>
          Posts
          </li>

          <li className=' flex p-2 hover:bg-gray-100 text-center items-center justify-center text-xl'>
            {!loggedIn ? <h1 onClick={()=> navigate("/modal")} className='cursor-pointer' >Signin/Register</h1> : <div>
            <button className='flex gap-2 cursor-pointer text-lw_red w-full px-10 py-2 items-center' onClick={logout}><AiOutlineLogout className='cursor-pointer' onClick={logout} />Logout</button>
            </div>}
          </li>
        </ul>
        
        
        
      </div>
      
      
    </div>
      
        
    </div>
  
</div>


  )
}

export default Navbar