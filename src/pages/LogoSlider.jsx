import React, { useState, useEffect } from 'react'
import { useSwipeable } from "react-swipeable";
import Slider from "react-slick";

function LogoSlider() {
    const settings = {
        infinite: true,
        speed: 2000, // slow movement (2 seconds)
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3, //number of logos visible at a time
        slidesToScroll: 1,
        swipe: true, //Allow swiping
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 4,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 3,
                },
              },
            ],
          };

    const logos = [
        {src: "../images/logo.png" , link: "https://example.com/logo1"},
        {src: "../images/logo.png" , link: "https://example.com/logo1"},
        {src: "../images/logo.png" , link: "https://example.com/logo1"},
        {src: "../images/logo.png" , link: "https://example.com/logo1"},
        {src: "../images/logo.png" , link: "https://example.com/logo1"},
        {src: "../images/logo.png" , link: "https://example.com/logo1"},
        {src: "../images/logo.png" , link: "https://example.com/logo1"},
    ];

  return (
        <div>
        <Slider {...settings}>
            {logos.map((logo, index) => (
                <div key={index} className='p-4'>
                    <a href={logo.link} target="_blank" rel="noopener noreferrer">
                        <img 
                            src={logo.src} 
                            alt={'logo ${index + 1}'} 
                            className='w-48 h-20 object-contain'
                        />
                    </a>
                    
                </div>
            ))}
        </Slider>
    </div>
    
  )
}

export default LogoSlider
