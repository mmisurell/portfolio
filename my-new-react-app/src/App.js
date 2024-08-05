import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import useContentful from "./hooks/useContentful";
import Carousel from "./components/Carousel";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import GalleryOne from "./pages/GalleryOne";
import GalleryTwo from "./pages/GalleryTwo";
import About from "./pages/About";
import Contact from "./pages/Contact";

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

function App() {
  const { data, error, loading } = useContentful(QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const carouselItems = data?.carouselCollection?.items || [];
  const carouselData = carouselItems.map((item) => ({
    src: item.image.url,
    alt: item.title,
  }));

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Carousel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery-one" element={<GalleryOne />} />
          <Route path="/gallery-two" element={<GalleryTwo />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <footer className="App-footer">
          {carouselData.length > 0 && <Carousel data={carouselData} />}
          {carouselData.length === 0 && <div>No images available</div>}
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
