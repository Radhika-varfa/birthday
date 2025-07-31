import React, { useState } from "react";
import "../../styles/CakeWithCandles.css";
import { motion } from "framer-motion";

const baseCandlePositions = [
  { top: "35.5%", left: "30%" },
  { top: "36.9%", left: "38.9%" },
  { top: "33%", left: "50.3%" },
  { top: "33%", left: "62%" },
  { top: "35%", left: "70.50%" },
];

const CakeWithCandles = () => {
  const [containerRef, setContainerRef] = useState(null);
  const [extinguishedFlames, setExtinguishedFlames] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleFlameClick = (index) => {
    if (!extinguishedFlames.includes(index)) {
      const newExtinguished = [...extinguishedFlames, index];
      setExtinguishedFlames(newExtinguished);

      if (newExtinguished.length === baseCandlePositions.length) {
        setShowPopup(true);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setExtinguishedFlames([]);
  };

  return (
    <div className="cake-container" ref={setContainerRef}>
      <img src="/images/cake1.png" alt="Birthday Cake" className="cake-img" />

      {baseCandlePositions.map((pos, index) => (
        <div
          key={`candle-${index}`}
          className="candle"
          style={{
            top: pos.top,
            left: pos.left,
            "--flame-scale": containerRef
              ? Math.min(1, containerRef.offsetWidth / 500)
              : 1,
          }}
        >
          {!extinguishedFlames.includes(index) && (
            <div
              className="flame-wrapper"
              onClick={() => handleFlameClick(index)}
            >
              <img
                src="/images/flame1.png"
                alt="Candle Flame"
                className="flame-img"
              />
            </div>
          )}
        </div>
      ))}

      {showPopup && (
        <div className="birthday-popup">
          <div className="popup-content">
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Happy Birthday My Love!
            </motion.h2>

            <div className="romantic-messages">
              <motion.div
                className="message-bubble"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                To my forever love - happy birthday, my heart!❤️
              </motion.div>

              <motion.div
                className="message-bubble"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                You're my today and all of my tomorrows ✨
              </motion.div>

              <motion.div
                className="message-bubble"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
               Growing old with you is my favorite dream🌹
              </motion.div>

              <motion.div
                className="message-bubble"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Can't wait to call you my husband 💍
              </motion.div>
            </div>

            <motion.div
              className="floating-hearts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  className="heart"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.8, 1, 0.8],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {i % 2 === 0 ? "❤️" : "💖"}
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              onClick={closePopup}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CakeWithCandles;
