import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  // Create letters from "Happy Birthday" with images
  const letters = "Happy Birthday".split("");
  const imageLetters = letters.map((letter, index) => ({
    char: letter,
    image: `/images/letter-${index % 5}.jpg` // Example image pattern
  }));

  return (
    <div className="home-container">
      <motion.div 
        className="birthday-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {imageLetters.map((item, index) => (
          <motion.div
            key={index}
            className="letter-container"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <div className="image-letter" style={{ backgroundImage: `url(${item.image})` }}>
              <span className="letter">{item.char === ' ' ? '\u00A0' : item.char}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        A journey of our beautiful 2.6 years together
      </motion.div>

      <motion.div 
        className="start-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Our Memories
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;