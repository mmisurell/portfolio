import React from "react";
import Header from "../components/Header";
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

function GalleryOne() {
  const { loading, error } = useContentful(QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Header>
        <h2>Gallery One</h2>
      </Header>
    </>
  );
}

export default GalleryOne;
