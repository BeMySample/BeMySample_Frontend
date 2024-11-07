import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NavBar = ({ childrenLeft, childrenCenter, childrenRight }) => {
  const storedLanguage = localStorage.getItem("language") || "id";
  const [language, setLanguage] = useState(storedLanguage);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className={`bg-opacity-70 backdrop-blur-md p-2 py-3 justify-between flex items-center fixed w-full z-[9999] bg-white font-inter ${
        scrolled ? "shadow-lg" : ""
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="ml-5 flex items-center">{childrenLeft}</div>

      {window.innerWidth > 768 && childrenCenter}

      <div className="mr-5 flex items-center gap-2">{childrenRight}</div>
    </motion.nav>
  );
};

export default NavBar;
