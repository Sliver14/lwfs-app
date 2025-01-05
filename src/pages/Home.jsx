import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import  ImageSlider from "./ImageSlider";
import VideoSlider from "./VideoSlider";
import { IoTimeOutline } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { IoChevronForwardOutline } from "react-icons/io5";


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
  
  const videoSlides = [
    { url: "http://localhost:5173/video1.mp4"
      , title: "video1" },
    
  ];

  return (
    <div className='flex flex-col pt-14 w-screen bg-white font-sans'>
       <div className='flex flex-col pt-20' >
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
      <div className="flex flex-col justify-center items-center w-screen h-[33vh] bg-gray-100">
        <h1 className='font-bold my-5' >Up Coming Programmes</h1>
        <div className="w-[95%] h-full shadow-lg">
          <ImageSlider slides={slides} autoScroll={true} interval={15000} />
        </div>
      </div>

      {/* Resource center video slider */}
      <div className="flex flex-col justify-center items-center bg-gray-100">
        <h1 className='font-bold my-5' >Directors message</h1>
        <div className="w-[95%] shadow-lg">
          {/* Auto-scroll enabled with 5-second interval */}
          <VideoSlider slides={videoSlides} autoScroll={true} interval={15000} />
        </div>
        <button className='bg-lwfs5 text-lwfs4 px-5 py-2 mt-2 hover:font-bold hover:shadow-sm hover:shadow-black rounded-md'>View more</button>
    </div>

      {/* Testimony slider*/}
      <div className='flex flex-col justify-center items-center' >
        <h1>Inspiring Tesimonies</h1>
        <h1>Title</h1>
        <button>Share your Testimony</button>
      </div>

      {/* LWFS News (blog) e.g graduation highlights */}
      <div className='flex flex-col w-screen items-center justify-center'>
      <div className='flex flex-col w-[95%] shadow-lg' >
        <h1 className='font-bold ml-10 my-2'>Blog</h1>
        <div className='flex flex-col pl-5 m-2 border-2px border-gray-100  hover:border-2 hover:border-lwfs2 hover:rounded-lg'>
          <div className='flex flex-col h-auto w-[95%] mt-3' >
            <img className='flex h-full w-full rounded-lg ' src='/images/za-zone-1.jpg' alt=''/>
          </div>
          
          <div className='flex gap-5 my-3'>
            <button className='bg-lwfs2 text-white text-sm px-2 py-[3px] rounded-sm'>Blog</button>
            <h1 className='flex items-center gap-1'><IoTimeOutline /> post date</h1>
            <h1 className='flex items-center'><GrView /> number of views</h1>
          </div>

          <div className='flex flex-col  '>
            <h1 className='font-bold '>Graduation Highlight from ZA Zone 1</h1>
            <p className='text-sm text-gray-700 w-[98%]'>hudnundnhbv gvsbydy xsbysbydhsdnsbtdbsygds tvvvsvs khbsjtvsv ybstjgsdgdsbycs ysgydsbydygh ybysdygdsys jbysdgsy </p>
          </div>
          <button className='flex items-center w-40 gap-1 border-2 border-slate-200 text-lwfs4 px-5 py-2 my-2 hover:font-bold hover:shadow-sm hover:bg-lwfs5 hover:border-0 hover:shadow-black rounded-md'>Read More <IoChevronForwardOutline className='text-xl'/></button>
        </div>
      </div>
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
      
     
    </div>
    
  )
}

export default Home
