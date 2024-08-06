// src/components/ImageGallery.js
import React, { useState, useEffect } from "react";
import "./carousel.css";

const SPACE_ID = process.env.REACT_APP_SPACE_ID;
const ACCESS_TOKEN = process.env.REACT_APP_CDA_TOKEN;
const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

// Fetch exhibition data based on the provided ID
const fetchExhibition = async (id) => {
  const query = `
query {
  exhibition(id: "${id}") {
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

const ImageGallery = ({ exhibitionId }) => {
  const [exhibition, setExhibition] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExhibition(exhibitionId);
        setExhibition(data);
      } catch (error) {
        console.error("Error fetching exhibition:", error);
      }
    };

    fetchData();
  }, [exhibitionId]);

  if (!exhibition) {
    return <div>Loading...</div>;
  }

  const {
    title,
    subtitle,
    artists,
    dates,
    videoLink,
    multipleFilesCollection,
  } = exhibition;
  const images = multipleFilesCollection.items || [];

  // Video is not part of the images array, so handle it separately
  const hasVideo = videoLink && videoLink.trim() !== "";

  // Make sure currentIndex is within the bounds of images
  const imageCount = images.length;
  const totalItems = hasVideo ? imageCount + 1 : imageCount;

  const currentItem =
    currentIndex === imageCount && hasVideo
      ? { url: videoLink, description: "Video" }
      : images[currentIndex] || { url: "", description: "No media available" };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalItems - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  // Determine if the current item is an image or video
  const isImage =
    currentItem.url &&
    !currentItem.url.includes("youtube.com") &&
    !currentItem.url.includes("vimeo.com");
  const isVideo =
    currentItem.url &&
    (currentItem.url.includes("youtube.com") ||
      currentItem.url.includes("vimeo.com"));

  return (
    <div className="exhibition">
      <div className="exhibition-title">
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      <div className="image-gallery">
        <div className="image-gallery-content">
          {isVideo ? (
            <iframe
              src={currentItem.url}
              title={currentItem.description}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></iframe>
          ) : isImage ? (
            <img
              src={currentItem.url}
              alt={currentItem.description || "No description available"}
              className="gallery-image"
            />
          ) : (
            <div>No media available</div>
          )}
        </div>
        <div className="nav-buttons">
          <button className="nav-button left" onClick={handleBack}>
            Back
          </button>
          <div className="counter">
            {currentIndex + 1} / {totalItems}
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
      <div className="exhibition-description">
        <h3>Description</h3>
        <p>{currentItem.description || "No description available"}</p>
      </div>
    </div>
  );
};

export default ImageGallery;
