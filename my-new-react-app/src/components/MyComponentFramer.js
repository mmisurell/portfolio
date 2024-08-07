import React from "react";
import { motion } from "framer-motion";

const MyComponentFramer = () => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    style={{
      padding: "10px",
      border: "none",
      backgroundColor: "#333",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    <a
      href="https://horseandpony.online"
      style={{ color: "white", textDecoration: "none" }}
    >
      <h1 style={{ margin: 0 }}>Horse & Pony</h1>
    </a>
  </motion.button>
);

export default MyComponentFramer;
