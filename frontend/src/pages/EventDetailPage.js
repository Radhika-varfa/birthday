import { useParams } from "react-router-dom";
import { useGallery } from "../context/GalleryContext";
import { motion } from "framer-motion";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Masonry from "react-masonry-css";
import "../styles/EventDetailPage.css"; // Create this CSS file

// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const API_BASE_URL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:5000/api"
//     : "https://birthday-weui.onrender.com/api";
const API_BASE_URL = process.env.REACT_APP_API_URL;
const EventDetailPage = () => {
  const { id } = useParams();
  const { galleryItems } = useGallery();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const navigate = useNavigate();

  const event = galleryItems.find((item) => item._id === id);

  if (!event) {
    return <div className="not-found">Event not found</div>;
  }

  const images = event.images.map((image) => ({
    src:
      typeof image === "object"
        ? image.url
        : `${API_BASE_URL}/uploads/${image}`,
    alt: event.title,
    id: typeof image === "object" ? image.filename : image,
  }));

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="event-detail-page">
      <div className="event-header">
        <button
          onClick={() => navigate(-1)}
          className="back-button"
          whileHover={{ scale: 1.05 }}
        >
          ← Back to Gallery
        </button>

        <div className="event-info">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {event.title}
          </motion.h1>
          <p className="event-date">
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="image-count">{images.length} photos</p>
        </div>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="event-masonry-grid"
        columnClassName="event-masonry-grid_column"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="event-image-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="event-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpg";
              }}
            />
          </motion.div>
        ))}
      </Masonry>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex].src}
          nextSrc={images[(photoIndex + 1) % images.length].src}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          imageTitle={event.title}
          imageCaption={new Date(event.date).toLocaleDateString()}
        />
      )}
    </div>
  );
};

export default EventDetailPage;
