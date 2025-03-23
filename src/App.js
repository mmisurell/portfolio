import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GalleryOne from "./pages/GalleryOne";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import RedirectToHome from "./components/RedirectToHome";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery-one" element={<GalleryOne />} />
          <Route path="*" element={<NoPage />} />
          {/* Redirect "/exhibitions" to the Home page */}
          <Route path="/exhibitions" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
