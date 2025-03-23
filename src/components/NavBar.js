import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  const location = useLocation();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 0) {
      setShowNav(true);
      lastScrollY.current = currentScrollY;
      return;
    }

    const scrollDelta = currentScrollY - lastScrollY.current;
    if (Math.abs(scrollDelta) < 5) return;

    setShowNav(scrollDelta < 0);
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav className={`navbar ${showNav ? "visible" : "hidden"}`}>
      <div className="nav-wrapper">
        <div className="logo-wrapper">
          <Link to="/" onClick={closeMenu}>
            <img
              src="/horseandpony_logo.png"
              alt="Home Logo"
              style={{ width: "auto", height: "36px" }}
            />
          </Link>
        </div>
        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar1"></div>
          <div className="bar3"></div>
        </div>
        <ul className={`navbar-list ${isOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className={location.pathname === "/" ? "current-page" : ""}
            >
              Exhibitions
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={closeMenu}
              className={location.pathname === "/about" ? "current-page" : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={closeMenu}
              className={location.pathname === "/contact" ? "current-page" : ""}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
