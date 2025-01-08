import React from 'react'
import { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import Cookies from "js-cookie";

function Modal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);
  const [isRegister, setIRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if(!loggedIn){
  //     setIsModalOpen(true);
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("authToken"); // Retrieve the token from cookies
      if(token){
        setLoggedIn(true);
        setIsModalOpen(false);
      } else{
        setLoggedIn(false);
        setIsModalOpen(true);
      }
      // if (token) {
      //   try {
      //     // Optional: Validate the token with the backend
      //     const response = await fetch("http://localhost:3001/auth/validate-token", {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      //     });

      //     if (response.ok) {
      //       setLoggedIn(true); // Token is valid, set loggedIn to true
      //       setIsModalOpen(false);
      //     } else {
      //       setLoggedIn(false); // Token invalid, set loggedIn to false
      //       setIsModalOpen(true);
      //     }
      //   } catch (error) {
      //     console.error("Error validating token:", error);
      //     setLoggedIn(false); // Set loggedIn to false in case of error
      //     setIsModalOpen(true);
      //   }
      // } else {
      //   setLoggedIn(false); // No token found, set loggedIn to false
      //   setIsModalOpen(true);
      // }
    };

    checkToken(); // Call the function on component mount
  }, [loggedIn]); // Empty dependency array ensures this runs only once

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      // Make POST request to the backend
      const response = await fetch("lwfs-app-server-production.up.railway.app/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Sign-in failed");
      }

      const { token } = await response.json(); // Extract token from response

      // Save token to cookies
      Cookies.set("authToken", token, { expires: 1 / 24, secure: true, sameSite: "strict" });

      alert("Sign-in successful!");
      setEmail(""); // Clear email field
      setError(null); // Clear errors
    } catch (err) {
      console.error("Sign-in error:", err);
      setError(err.message); // Display error to the user
    }
  };

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
