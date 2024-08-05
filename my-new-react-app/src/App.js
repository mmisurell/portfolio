import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import GalleryTwo from "./pages/GalleryTwo.js";
import GalleryOne from "./pages/GalleryOne.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";

import "./App.css";
import NavBar from "./components/NavBar"; // Import the NavBar component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/gallery-one" element={<GalleryOne />} />
          <Route path="/gallery-two" element={<GalleryTwo />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
