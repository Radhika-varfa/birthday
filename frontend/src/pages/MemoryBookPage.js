import { useState, useEffect, useRef } from "react";
import "../styles/MemoryBookPage.css";

const MemoryBookPage = () => {
  const memories = [
    {
      id: 1,
      title: "Our Roka Special Day 💍",
      description:
        "The day our forever journey began — filled with love, blessings, and unforgettable moments with family. 💖",
      image: "/images/roka1.jpg",
    },
    {
      id: 2,
      title: "Abhishek at Shiva Mandir 🕉️",
      description:
        "A peaceful and divine day when we did abhishek together — our second spiritual moment as one. ✨",
      image: "/images/mandir.jpg",
    },
    {
      id: 3,
      title: "Our First Anniversary 🎉❤️",
      description:
        "We celebrated our first anniversary with love and togetherness — that personal, romantic time, your hug, your kiss... a day etched in my heart forever. 💞",
      image: "/images/anniversary1.jpg",
    },
    {
      id: 4,
      title: "Sudden Trip with Friends 🚗🎒",
      description:
        "We made a last-minute plan and had so much fun together. A day full of joy and good memories! 😄✨",
      image: "/images/gulawat.jpg",
    },
    {
      id: 5,
      title: "2nd Anniversary Surprise 🕯️🍷",
      description:
        "A romantic candlelight dinner — just you and me. Your surprise made it an unforgettable night. 💘",
      image: "/images/MyLove (1).jpg",
    },
    {
      id: 6,
      title: "Friend’s Wedding Fun 💃🎊",
      description:
        "I met all your crazy friends that day — we got even closer and had so much fun together! 💑❤️",
      image: "/images/love.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
  const autoSwipeInterval = useRef(null);
  const isMobile = window.innerWidth <= 768;

  // Auto swipe functionality
  useEffect(() => {
    autoSwipeInterval.current = setInterval(() => {
      setActiveIndex(
        (prev) => (prev + 1) % (memories.length - (isMobile ? 0 : 3))
      );
    }, 5000);

    return () => clearInterval(autoSwipeInterval.current);
  }, [memories.length, isMobile]);

  const handleCardHover = (index) => {
    if (!isMobile) {
      setHoveredCard(index);
    }
  };

  const handleCardLeave = () => {
    if (!isMobile) {
      setHoveredCard(null);
    }
  };

  const handleCardClick = (index) => {
    if (isMobile) {
      setClickedCard(clickedCard === index ? null : index);
    }
  };

  const goToNext = () => {
    setActiveIndex(
      (prev) => (prev + 1) % (memories.length - (isMobile ? 0 : 3))
    );
    resetAutoSwipe();
  };

  const goToPrev = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + (memories.length - (isMobile ? 0 : 3))) %
        (memories.length - (isMobile ? 0 : 3))
    );
    resetAutoSwipe();
  };

  const resetAutoSwipe = () => {
    clearInterval(autoSwipeInterval.current);
    autoSwipeInterval.current = setInterval(() => {
      setActiveIndex(
        (prev) => (prev + 1) % (memories.length - (isMobile ? 0 : 3))
      );
    }, 5000);
  };

  // Get the cards to display based on activeIndex and device type
  const visibleCards = isMobile
    ? memories
    : memories.slice(activeIndex, activeIndex + 4);

  return (
    <div className="memory-book-container">
      <div className="welcome-section">
        <h1>Our Memory Book</h1>
        <p>Flip through our journey together</p>
      </div>

      <div className="memory-carousel">
        {!isMobile && (
          <button className="nav-arrow prev" onClick={goToPrev}>
            &larr;
          </button>
        )}

        <div className="memory-cards-container">
          {visibleCards.map((memory, index) => (
            <div
              key={memory.id}
              className={`memory-card ${
                hoveredCard === index ? "hovered" : ""
              } ${clickedCard === index ? "active" : ""}`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              onClick={() => handleCardClick(index)}
            >
              <img src={memory.image} alt={memory.title} />
              <div className="card-overlay">
                <h3>{memory.title}</h3>
                <p>{memory.description}</p>
              </div>
              {/* <div className="card-likes">{memory.likes}</div> */}
            </div>
          ))}
        </div>

        {!isMobile && (
          <button className="nav-arrow next" onClick={goToNext}>
            &rarr;
          </button>
        )}
      </div>

      {!isMobile && (
        <div className="page-indicator">
          {activeIndex + 1}-{Math.min(activeIndex + 4, memories.length)} of{" "}
          {memories.length}
        </div>
      )}
    </div>
  );
};

export default MemoryBookPage;
