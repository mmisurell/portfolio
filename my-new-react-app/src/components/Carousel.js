import React from "react";
import Header from "./Header";
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

function Carousel() {
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
      <Header>
        <h2>Gallery One</h2>
        {carouselData.length > 0 ? (
          <Carousel data={carouselData} />
        ) : (
          <div>No images available</div>
        )}
      </Header>
    </>
  );
}

export default GalleryOne;
