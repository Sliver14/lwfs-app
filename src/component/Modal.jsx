import React from 'react'
import { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import countryCodes from "../utils/countryCodes.js";
import zones from "../utils/zones.js";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Modal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);
  const [isRegister, setIRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  }

// Function to handle sign-in
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("lwfs-app-server-production.up.railway.app/auth/signin", { email });

    const { token } = response.data;

    // Save token to cookies
    Cookies.set("authToken", token, { expires: 30, secure: true, sameSite: "strict" });

    setSuccess(response.data.message);
    setLoggedIn(true); // Set loggedIn to true
    setIsModalOpen(false);
    setError(null); // Clear error
    alert("Sign-in successful!");
  } catch (err) {
    console.error("Sign-in error:", err);
    setError(err.response?.data?.error || "Sign-in failed");
    setLoggedIn(false); // Set loggedIn to false on error
  }
};

//handle signup


// Function to check if a valid token exists
const checkAuthToken = async () => {
  const token = Cookies.get("authToken");

  if (!token) {
    setLoggedIn(false); // No token, user is not logged in
    return;
  }

  try {
    const response = await axios.post("lwfs-app-server-production.up.railway.app/auth/verify", { token });

    if (response.status === 200) {
      setLoggedIn(true); // Valid token, user is logged in
      setIsModalOpen(false);
    } else {
      setLoggedIn(false); // Invalid token
      setIsModalOpen(true);
    }
  } catch (err) {
    console.error("Token verification error:", err);
    setLoggedIn(false); // Error in token validation
    setIsModalOpen(true);
  }
};

// Run token check on component mount
useEffect(() => {
  checkAuthToken();
}, []);


  return (
    <div>
           {/* Modal */}
           {isModalOpen && (
        <div className="flex flex-col fixed top-0 left-0 rigth-0 bottom-0 w-screen h-screen bg-lwfs4 justify-center items-center bg-opacity-80 z-50 transition duration-300 ">
          
          <div className="relative flex w-11/12 h-3/6 transition duration-300 justify-center items-center bg-white rounded-lg ">
            
          <div className='flex flex-col  justify-center items-center text-center w-10/12 h-4/6 ' >
            
            {isLogIn && <>
                <div className='flex justify-center w-full items-center mb-10 transition duration-300' >
                  <h2 className='text-4xl font-bold ' >Sign In</h2>
                  <button onClick={closeModal}>  
                    <IoCloseSharp className='absolute font-bold text-2xl top-5 right-5' />
                  </button>
                </div>
              
               {/* Login */}
              <div className='flex flex-col items-center' >
                <input onChange={(event) => setEmail(event.target.value)} className='border border-lwfs3 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lwfs2 text-2xl' type="text" placeholder='Email'/>
                <button onClick={handleSubmit} className='bg-lwfs2 w-32 mt-5 rounded-md text-white p-2 mb-5' >Sign In </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <span onClick={()=>{setIsLogIn(false),setIRegister(true)}}>New here? <a className='text-lwfs2 cursor-pointer' >Create Account</a></span>
              </div>
              
              
            </>  
            }
            
            {/* Create Account */}
            {isRegister && <>
              <div className='flex justify-center w-full items-center mb-10 ' >
                  <h2 className='text-2xl font-bold  ' >Create Account</h2>
                  <button onClick={closeModal}>  
                    <IoCloseSharp className='absolute font-bold text-2xl top-5 right-5' />
                  </button>
              </div>

              <div className='flex flex-col items-center' >
                <input className='border border-lwfs3 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lwfs2 text-2xl' type="text" placeholder='Email'/>
                <button className='bg-lwfs2 w-32 mt-5 rounded-md text-white p-2 mb-5' >Create Account </button>
                <span onClick={()=>{setIsLogIn(true),setIRegister(false)}}>Already Registered? <a className='text-lwfs2 cursor-pointer' >Sign in</a></span>
              </div>
            </>  
            }

          </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal
