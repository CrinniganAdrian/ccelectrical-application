import React, { useState, useEffect } from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import "../App.css";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [current, length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt={`Slide ${index + 1}`} className='image' />
            )}
          </div>
        );
      })}

      {/* Slide indicators */}
      <div className='slider-indicators'>
        {SliderData.map((_, index) => (
          <div
            key={index}
            className={index === current ? 'slider-indicator active' : 'slider-indicator'}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;