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
  return data.exhibition;
};

const ImageGallery = () => {
  const [exhibition, setExhibition] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExhibition();
        setExhibition(data);
      } catch (error) {
        console.error("Error fetching exhibition:", error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === exhibition.multipleFilesCollection.items.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? exhibition.multipleFilesCollection.items.length - 1
        : prevIndex - 1
    );
  };

  if (!exhibition) {
    return <div>Loading...</div>;
  }

  const { title, subtitle, artists, dates, multipleFilesCollection } =
    exhibition;
  const images = multipleFilesCollection.items;

  return (
    <div className="exhibition">
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
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
      <div className="exhibition-artists">
        <h3>Artists</h3>
        <p>{artists}</p>
      </div>
      <div className="exhibition-dates">
        <h3>On View</h3>
        <p>{dates}</p>
      </div>
      <div className="exhibition-multiple-file-collection-description">
        <h3>Description</h3>
        <p>{images[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default ImageGallery;
