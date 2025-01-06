import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import  ImageSlider from "./ImageSlider";
import Modal from "../component/Modal"
import VideoSlider from "./VideoSlider";



function Home() {
  const navigate = useNavigate();
  
  const slides = [
    // {url: "/Jan-comm.jpg", title: "Jan-comm"},
    {url: "/16th-summit.jpeg", title: "16th-summit"},
    // {url: "/logo.png", title: "logo"},
  ];
  
  const videoSlides = [
    { url: "https://player.vimeo.com/video/1044177288?autoplay=1&loop=1&title=0&byline=0&muted=1&portrait=0"
      , title: "video1" },
    
  ];

  return (
    <div className='flex flex-col w-screen text-md bg-white font-sans'>

       <div className='flex flex-col pt-12 pb-20' >

      <Modal/>

      {/* Up coming programmes */}
      <div className="relative flex flex-col justify-center items-center w-screen h-[320px] bg-gray-100">
        <div className="w-[95%] h-full shadow-lg ">
          <ImageSlider slides={slides} autoScroll={true} interval={5000} />
        </div>
        <a className='absolute bottom-7 left-3 bg-lwfs2 text-lwfs3 px-5 py-2 mt-2 hover:font-bold hover:shadow-sm hover:shadow-black rounded-md cursor-pointer' href="http://lwfoundationschool.org/datacenter/registration/ " target="_blank">Click to Register</a>
      </div>

      {/* Testimony slider*/}
      <div className='flex flex-col justify-center items-center' >
        <h1>Inspiring Tesimonies</h1>
        <h1>Title</h1>
        <button>Share your Testimony</button>
      </div>

      {/* Resource center video slider */}
      <div className="flex flex-col justify-center items-center  bg-gray-100 pt-3">
        <div className="w-[95%] h-auto">
          {/* Auto-scroll enabled with 5-second interval */}
          <VideoSlider slides={videoSlides} autoScroll={true} interval={15000}/>
        </div>
        <button className='bg-lwfs2 text-lwfs3 px-5 py-2 mb-5 mt-2 hover:font-bold hover:shadow-sm hover:shadow-black rounded-md cursor-pointer'>View more</button>
    </div>

      {/* Programmes */}

      {/* Store */}
      <div className='flex flex-col justify-center items-center' >
        <h1>Loveworld Foundation School Products</h1>
        <div></div>
        <button>Visit Store</button>
      </div>

      {/* Prayer of Salvation */}

       </div>     
    </div>
    
  )
}

export default Home
