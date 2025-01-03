import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import ImageSlider from "../component/ImageSlider";

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);
  const [isRegister, setIRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if(!loggedIn){
      setIsModalOpen(true);
    }
  }, [loggedIn]);

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const images = [
    "https://photos.fife.usercontent.google.com/pw/AP1GczMgR4azRi9-mI5jaiy6i2ZQRWebJhWIp6ovAGUoDtF5nuTOGypFFNYvZw=w500-h375-s-no-gm?authuser=0",
  "https://photos.google.com/photo/AF1QipMFonZ9HoJPQcLjK6FGToYVO18qJl84xH3MPdO8",
  "https://photos.google.com/photo/AF1QipPr6oWLRl46wx4UP3cy4c6jofQp_R2Y0ML3nXj-",
  ];

  return (
    <div className='flex flex-col w-screen'>
       
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
                <input className='border border-lwfs3 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lwfs2 text-2xl' type="text" placeholder='Email'/>
                <button className='bg-lwfs2 w-32 mt-5 rounded-md text-white p-2 mb-5' >Sign In </button>
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

              {/* <h2>Create Account</h2>
              <form action="">
              <input type="text" placeholder='Email'/>
              <input type="password" placeholder='Password'/>
              <button >Create Account</button>
              </form>
              <span onClick={()=>{
                setIsLogIn(true);
                setIRegister(false);
                }}>Sign In</span> */}
            </>  
            }

          </div>
          </div>
        </div>
      )}

      <div className=" relative min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-10">
        <div>
          <h1 className='text-2xl font-semibold'>Up-Coming Programmes</h1>
        </div>
          <div className="w-full max-w-4xl">
              <ImageSlider images={images} autoSlide={true} interval={8000} />
          </div>
      </div>
     
    </div>
    
  )
}

export default Home
