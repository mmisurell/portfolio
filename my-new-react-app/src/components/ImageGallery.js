import React from "react";
import useContentful from "../hooks/useContentful";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const carouselItems = data?.carouselCollection?.items || [];
  const carouselData = carouselItems.map((item) => ({
    src: item.image.url,
    alt: item.title,
  }));

  return (
    <>
      <h2>Gallery</h2>
      {carouselData.length > 0 ? (
        <ImageGallery data={carouselData} />
      ) : (
        <div>No images available</div>
      )}
    </>
  );
}

export default ImageGallery;
