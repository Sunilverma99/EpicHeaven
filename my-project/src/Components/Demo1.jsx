import React, { useState, useEffect } from 'react';
import { GoChevronRight ,GoChevronLeft  } from "react-icons/go";

export default function Demo1({ offerListings }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? offerListings.imageUrls.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === offerListings.imageUrls.length - 1 ? 0 : prevSlide + 1));
  };

  const handleSlideIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    // Automatically slide every 3000 milliseconds (3 seconds)
    const intervalId = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => {
      // Cleanup the interval on component unmount
      clearInterval(intervalId);
    };
  }, [currentSlide]);

  return (
    <div id="default-carousel" className="relative w-full max-w-6xl mx-auto" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {/* Carousel items */}
        {offerListings.imageUrls.map((url, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? 'block' : 'hidden'
            } duration-700 ease-in-out`}
            data-carousel-item
          >
            <img
              src={url}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {offerListings.imageUrls.map((url, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide
                ? 'bg-slate-900/70 dark:bg-gray-800/30'
                : 'bg-white/30 dark:bg-gray-800/30'
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleSlideIndicatorClick(index)}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>

     
      {/* <button
        type="button"
        className="absolute top-0  start-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group "
        data-carousel-prev
        onClick={handlePrevSlide}
      >
         <GoChevronLeft className=' w-14 h-14' />
       
      </button>

      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center  px-4   "
        data-carousel-next
        onClick={handleNextSlide}
      >
         <GoChevronRight className=' w-14 h-14' />
      </button> */}
    </div>
  );
}
