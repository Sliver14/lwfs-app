import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import  ImageSlider from "./ImageSlider";
import  LogoSlider from "./LogoSlider";
import Modal from "../component/Modal"
import VideoSlider from "./VideoSlider";



function Home() {
  const navigate = useNavigate();
  
  const slides = [
    {url: "../images/hslhs.jpeg", title: "hslhs"},
    {url: "../images/jan-jan.jpg", title: "Jan-comm"},
    // {url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1736329279/samples/smile.jpg", title: "logo"},
  ];
  
  const videoSlides = [
    { url: "https://res.cloudinary.com/dfi8bpolg/video/upload/v1736329275/samples/cld-sample-video.mp4"
      , title: "video1" },
    
  ];

  return (
    <div className='flex flex-col w-screen text-base bg-white font-sans'>

       <div className='flex flex-col pt-12 pb-20 gap-2' >

      <Modal/>
      
      <div className='flex flex-col relative '>
        <img className='object-cover object-[50%_20%] h-52 w-full' src='../images/bg-bg.jpeg'/>
        <div className='absolute inset-0 bg-black opacity-65'></div>
        <div className='absolute inset-0 flex items-center justify-start p-10'> 
          <div className=' flex flex-col text-white text-2xl font-semibold'>
            <p className='text-lw_yellow text-xl'>Loveworld</p>
            <p className='font-black'>Foundation School</p>
          </div>
        </div>
        
      </div>

      {/* Up coming programmes */}
      <div className="relative flex flex-col justify-center items-center w-screen h-[420px] gap-5">
        <div className="w-screen h-56 shadow-lg ">
          <ImageSlider slides={slides} autoScroll={true} interval={20000} />
        </div>
        <div className='flex flex-col px-2 gap-5'>
          <h1 className='text-lw_red text-4xl font-extrabold self-center'>Upcoming Events</h1>
          <h1 className='text-wrap' >Global service with our Dear Man of God, where all Christ Embassy churches around the world would be connected to our Man of God.</h1>
        </div>
      </div>

      {/* Post */}
      <div>
        <div className='flex flex-col w-screen gap-5'>
          <img src='../images/loading-1q.jpg'/>
          <div className='flex px-2 gap-5 justify-center items-center flex-wrap'>
            <h1 className='text-2xl font-bold text-lw_blue text-center '>1Q 2025 Foundation School Graduation</h1>
            <p className='text-wrap'>The 16th Global Summit was a huge Success, having participants from over 80 Nation,  this remarkable feet was accomplished by our Principals and Teachers from all over the world, the impact of this 16th.</p>
          </div>
        </div>
      </div>

      {/* Platforms Logo Slider */}
      <div className="relative flex flex-col justify-center items-center w-screen py-10">
        <h1 className='text-2xl font-bold text-center text-lw_dark_blue uppercase'>Our Platforms</h1>
        <div className="w-screen  shadow-lg py-10 ">
          <LogoSlider />
        </div>
      </div>

      {/* Testimony slider*/}
      <div className='flex relative flex-col justify-center items-center' >
        <img src='../images/partnership.jpg'/>
        <div></div>
      </div>

      {/* Resource center video slider */}
      <div className="">
        <div className="w-[100%] h-[38vh] overflow-hidden">
          {/* Auto-scroll enabled with 5-second interval */}
          <VideoSlider slides={videoSlides} autoScroll={true} interval={15000}/>
        </div>
        <button className='bg-lwfs2 text-lwfs3 px-5 py-2 mb-5 mt-2 hover:font-bold hover:shadow-sm hover:shadow-black rounded-md cursor-pointer'>View more</button>
    </div>


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
