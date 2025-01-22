import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

function ImageSlider({ slides, autoScroll = true, interval = 20000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup on unmount or navigation
  }, [autoScroll, interval, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // const goToSlide = (index) => {
  //   setCurrentIndex(index);
  // };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  if (!slides || slides.length === 0) {
    return <div className="text-center text-gray-500">No slides available</div>;
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      {...swipeHandlers}
    >
      {/* Slide */}
      <div
        className="w-full h-full bg-cover bg-[20%_25%] transition-all duration-1000 object-cover"
        style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }}
      ></div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-xl p-2 bg-gray-500 rounded-full opacity-70 hover:bg-gray-900 transition-opacity duration-300"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl p-2 bg-gray-500 rounded-full opacity-70 hover:bg-gray-900 transition-opacity duration-300"
        onClick={nextSlide}
      >
        &#10095;
      </button>

      {/* Slider Indicator */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gray-800 scale-125"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div> */}
    </div>
  );
}

export default ImageSlider;


  