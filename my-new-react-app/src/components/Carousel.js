import React, { useState } from "react";
import "./carousel.css";

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  if (data.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="arrow arrow-left">
        &lt;
      </button>
      {data.map((item, idx) => (
        <img
          src={item.src}
          alt={item.alt}
          key={idx}
          className={slide === idx ? "slide" : "slide slide-hidden"}
        />
      ))}
      <button onClick={nextSlide} className="arrow arrow-right">
        &gt;
      </button>
      <div className="counter">
        {slide + 1} / {data.length}
      </div>
    </div>
  );
};
