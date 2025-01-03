import React from 'react';
import Slider from 'react-slick';

const SlickImageSlider = () => {
  const images = [
    "/images/image1.jpg", // Path relative to the public folder
    "/images/image2.jpg",
    "/images/image3.jpg",
  ];

  const settings = {
    dots: true,          // Show dots for navigation
    infinite: true,      // Infinite loop
    speed: 500,          // Transition speed in ms
    slidesToShow: 1,     // Number of slides to show
    slidesToScroll: 1,   // Number of slides to scroll
  };

  return (
    <div className="p-4 w-screen mx-auto">
      <Slider className='flex' {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image} // Use public folder image paths here
              alt={`Slider Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickImageSlider;
