import React, { useState } from 'react';
import FlipPage from 'react-flip-page';
import { motion } from 'framer-motion';
import './MemoryBook.css';

const MemoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      content: (
        <div className="book-page cover">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Our Memory Book
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Flip through our journey together
          </motion.p>
        </div>
      )
    },
    {
      content: (
        <div className="book-page">
          <h2>First Date</h2>
          <motion.img 
            src="/images/first-date.jpg" 
            alt="First date"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <p>That nervous excitement when we first went out together. You took me to that little Italian place, and we talked until they closed. I knew then I wanted to know everything about you.</p>
        </div>
      )
    },
    {
      content: (
        <div className="book-page">
          <h2>First Vacation</h2>
          <motion.img 
            src="/images/vacation.jpg" 
            alt="First vacation"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <p>Discovering new places together made us grow closer. From getting lost in narrow streets to watching sunsets on the beach, every moment was perfect because it was with you.</p>
        </div>
      )
    },
    {
      content: (
        <div className="book-page">
          <h2>Celebrations</h2>
          <motion.img 
            src="/images/celebration.jpg" 
            alt="Celebrations"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <p>Every achievement, big or small, celebrated together. Your proud smile when I accomplish something is my favorite reward.</p>
        </div>
      )
    },
    {
      content: (
        <div className="book-page">
          <h2>Quiet Moments</h2>
          <motion.img 
            src="/images/quiet.jpg" 
            alt="Quiet moments"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <p>Sometimes just being together is the best part. Reading books side by side, sharing comfortable silences - these are the moments I cherish the most.</p>
        </div>
      )
    },
    {
      content: (
        <div className="book-page cover">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            To Be Continued...
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our story is still being written
          </motion.p>
        </div>
      )
    }
  ];

  return (
    <div className="memory-book-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Memory Book
      </motion.h1>
      
      <div className="flip-book-container">
        <FlipPage
          orientation="horizontal"
          flipOnTouch={true}
          onPageChange={(e) => setCurrentPage(e.data)}
          showSwipeHint={true}
          responsive={true}
          uncutPages={true}
        >
          {pages.map((page, index) => (
            <article key={index}>
              {page.content}
            </article>
          ))}
        </FlipPage>
      </div>
      
      <div className="page-indicator">
        Page {currentPage + 1} of {pages.length}
      </div>
    </div>
  );
};

export default MemoryBook;