import React, { useState, useEffect } from "react";
import "./carousel.css";

const SPACE_ID = process.env.REACT_APP_SPACE_ID;
const ACCESS_TOKEN = process.env.REACT_APP_CDA_TOKEN;
const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

const fetchExhibition = async () => {
  const query = `
query {
  exhibition(id: "6yK6WPxTqNQFP99KWFbtOw") {
    title
    subtitle
    dates
    artists
    videoLink
    multipleFilesCollection {
      items {
        title
        description
        contentType
        fileName
        url
      }
    }
  }
}`;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const { data } = await response.json();
  return data.exhibition.multipleFilesCollection.items;
};

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExhibition();
        setImages(data);
      } catch (error) {
        console.error("Error fetching exhibition:", error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="image-gallery">
      <div className="image-gallery-content">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].description}
          className="gallery-image"
        />
      </div>
      <div className="nav-buttons">
        <button className="nav-button left" onClick={handleBack}>
          Back
        </button>
        <div className="counter">
          {currentIndex + 1} / {images.length}
        </div>
        <button className="nav-button right" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
