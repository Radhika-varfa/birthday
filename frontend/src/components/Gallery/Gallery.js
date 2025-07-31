import { useContext, useState } from "react";
import { MemoryContext } from "../../context/MemoryContext";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import "./Gallery.css";

const Gallery = () => {
  const { memories } = useContext(MemoryContext);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Get all images from memories with their associated memory data
  const allImages = memories.reduce((acc, memory) => {
    return [
      ...acc,
      ...memory.images.map((image) => ({
        src: image,
        title: memory.title,
        date: memory.date,
        description: memory.description,
      })),
    ];
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="gallery-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Memory Gallery
      </motion.h1>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {allImages.map((image, index) => (
          <motion.div
            key={index}
            className="gallery-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
          >
            <img src={image.src} alt={`Memory ${index + 1}`} loading="lazy" />
            <div className="image-overlay">
              <h3>{image.title}</h3>
              <p>{new Date(image.date).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))}
      </Masonry>

      {isOpen && (
        <Lightbox
          mainSrc={allImages[photoIndex].src}
          nextSrc={allImages[(photoIndex + 1) % allImages.length].src}
          prevSrc={
            allImages[(photoIndex + allImages.length - 1) % allImages.length]
              .src
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + allImages.length - 1) % allImages.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % allImages.length)
          }
          imageTitle={allImages[photoIndex].title}
          imageCaption={
            <>
              <p>{new Date(allImages[photoIndex].date).toLocaleDateString()}</p>
              <p>{allImages[photoIndex].description}</p>
            </>
          }
        />
      )}
    </div>
  );
};

export default Gallery;
