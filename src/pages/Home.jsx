import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import  ImageSlider from "./ImageSlider";


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

  const slides = [
    {url: "http://localhost:5173/Jan-comm.jpg", title: "Jan-comm"},
  ];

  return (
    <div className='flex flex-col w-screen bg-gray-100'>
       
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

      {/* Up coming programmes */}
      <div className="flex flex-col top-0  justify-center items-center h-screen bg-gray-100">
        <h1 className='font-bold py-5' >Up Coming Programmes</h1>
        <div className="w-[90%] h-[20%] shadow-lg">
          <ImageSlider slides={slides} autoScroll={true} interval={15000} />
        </div>
      </div>

      {/* Resource center slider */}
      <div className='flex flex-col h-72 border-4 border-solid border-slate-900 justify-center items-center w-screen' >
        <h1>Directors Message</h1>
        <button>View more</button>
      </div>

      {/* Testimony slider*/}
      <div className='flex flex-col justify-center items-center' >
        <h1>Tesimony Bank</h1>
        <h1>Title</h1>
        <button>Share your Testimony</button>
      </div>

      {/* LWFS News (blog) e.g graduation highlights */}
      <div className='flex flex-col justify-center items-center' >
        <h1>Recent Post</h1>
        <div></div>
      </div>

      {/* Store */}
      <div className='flex flex-col justify-center items-center' >
        <h1>Loveworld Foundation School Products</h1>
        <div></div>
        <button>Visit Store</button>
      </div>

      {/* About Foundation School */}
      <div className='flex flex-col justify-center items-center'>
        <img src='' alt='images'/>
        <h1>leromipsom nufjfjufnf fhjdhdjddh hdhdhdh </h1>
      </div>

      {/* footer */}
      <div className='flex flex-col justify-center items-center'>
        Quicklinks legal privacy_policy
        Contact Us, Contact info, Office Address
        Social media- Kingschat  
        2025 All rights reserverd | privacy_policy
      </div>
     
    </div>
    
  )
}

export default Home
