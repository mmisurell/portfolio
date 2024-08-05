import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import GalleryOne from "./pages/GalleryOne";
import GalleryTwo from "./pages/GalleryTwo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery-one" element={<GalleryOne />} />
          <Route path="/gallery-two" element={<GalleryTwo />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> {/* 404 page route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
