import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const controls = useAnimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const animateColors = async () => {
      while (true) {
        await controls.start({
          background: [
            "linear-gradient(45deg, #ff9a9e, #fad0c4)",
            "linear-gradient(45deg, #a18cd1, #fbc2eb)",
            "linear-gradient(45deg, #fbc2eb, #a6c1ee)",
            "linear-gradient(45deg, #a6c1ee, #f6d365)",
            "linear-gradient(45deg, #f6d365, #ff9a9e)",
          ],
          transition: { duration: 8, repeat: Infinity, ease: "linear" },
        });
      }
    };
    animateColors();
  }, [controls]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      className="header"
      animate={controls}
      initial={{ background: "linear-gradient(45deg, #ff9a9e, #fad0c4)" }}
    >
      <div className="header-container">
        <motion.div
          className="logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
            textShadow: "0 0 10px rgba(255,255,255,0.8)",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          whileHover={{
            scale: 1.1,
            textShadow: "0 0 15px rgba(255,255,255,1)",
          }}
        >
          <Link to="/">Our Memories</Link>
        </motion.div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="white"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="white"
                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              />
            </svg>
          )}
        </button>

        <nav className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
            }}
          >
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.1,
                y: -3,
                textShadow: "0 0 8px rgba(255,255,255,0.8)",
              }}
            >
              <Link
                to="/"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{
                scale: 1.1,
                y: -3,
                textShadow: "0 0 8px rgba(255,255,255,0.8)",
              }}
            >
              <Link
                to="/timeline"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Timeline
              </Link>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{
                scale: 1.1,
                y: -3,
                textShadow: "0 0 8px rgba(255,255,255,0.8)",
              }}
            >
              <Link
                to="/gallery"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{
                scale: 1.1,
                y: -3,
                textShadow: "0 0 8px rgba(255,255,255,0.8)",
              }}
            >
              <Link
                to="/love-story"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{
                scale: 1.1,
                y: -3,
                textShadow: "0 0 8px rgba(255,255,255,0.8)",
              }}
            >
              <Link
                to="/memory-book"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Memory Book
              </Link>
            </motion.li>
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
