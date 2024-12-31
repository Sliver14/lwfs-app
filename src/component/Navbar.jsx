import React from 'react'
import { Link } from 'react-router-dom';
import "../style/Navbar.css";
import { useState } from 'react';
import Modal from "../component/Modal";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
        const [isModalOpen, setIsModalOpen] = useState(false);
     const [isLogIn, setIsLogIn] = useState(true);
     const [isRegister, setIRegister] = useState(false);
     const [isOpen, setIsOpen] = useState(false);
   
     const toggleSidebar = () => {
       setIsOpen(!isOpen);
     }
   
     const openModal = () => setIsModalOpen(true);
     const closeModal = () => setIsModalOpen(false);
  return (
    <div className='navbar'>
      
    <div className='header-container'>
      
      <div className='profile-picture-container'>
      </div><span className='user-name'>User</span>

      <button onClick={openModal}>Login / Register</button>

      {/* Toggle */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <MenuOpenIcon/> : <MenuIcon/>}
      </button>
    </div>

    {/* Sidebar */}
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
      <ul>
      <Link to="/live-tv">LiveTv</Link>
        <li>LWFS Store</li>
        <li>Online foundation School/Exams</li>
        <li>Testimony Bank</li>
      </ul>
    </div>
  
  {/* Modal */}
  {isModalOpen && (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>X</button>

        {isLogIn && <>
          <h2>Sign In</h2>
          {/* Add your Login/Register forms here */}
          <form action="">
          <input type="text" placeholder='Email'/>
          <input type="password" placeholder='Password'/>
          <button >Sign In</button>
          </form>
          <span onClick={()=>{setIsLogIn(false),setIRegister(true)}}>Create Account</span>
        </>  
        }

        {/* Create Account */}
        {isRegister && <>
          <h2>Create Account</h2>
          <form action="">
          <input type="text" placeholder='Email'/>
          <input type="password" placeholder='Password'/>
          <button >Create Account</button>
          </form>
          <span onClick={()=>{setIsLogIn(true),setIRegister(false)}}>Sign In</span>
        </>  
        }

        
      </div>
    </div>
  )}
</div>


  )
}

export default Navbar
