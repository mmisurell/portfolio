import React, { useState } from "react";
import useContentful from "../hooks/useContentful";
import "../components/carousel.css";

const QUERY = `
{
  carouselCollection {
    items {
      title
      description
      image {
        url
        description
      }
    }
  }
}
`;

function ImageGallery() {
  const { data, loading, error } = useContentful(QUERY);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const carouselItems = data?.carouselCollection?.items || [];

  if (carouselItems.length === 0) {
    return <div>No images available</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const carouselData = carouselItems.map((item) => ({
    src: item.image.url,
    alt: item.title,
  }));

  return (
    <div className="image-gallery">
      <div className="image-gallery-content">
        <img
          src={carouselData[currentIndex].src}
          alt={carouselData[currentIndex].alt}
          className="gallery-image"
        />
        <div className="nav-buttons">
          <button className="nav-button" onClick={handleBack}>
            Back
          </button>
          <div className="counter">
            {currentIndex + 1} / {carouselData.length}
          </div>
          <button className="nav-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
