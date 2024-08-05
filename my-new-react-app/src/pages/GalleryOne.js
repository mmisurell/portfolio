import React from "react";
import ImageGallery from "../components/ImageGallery";

function GalleryOne() {
  return (
    <div>
      <h1>Gallery Test</h1>
      <div className="gallery">
        <ImageGallery />
        <p>Show information goes here</p>
        <ImageGallery />
      </div>
    </div>
  );
}

export default GalleryOne;
