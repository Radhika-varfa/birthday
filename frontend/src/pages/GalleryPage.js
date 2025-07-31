import { useState } from "react";
import { useGallery } from "../context/GalleryContext";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";
import "../styles/GalleryPage.css";
import GalleryForm from "./GalleryForm";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const GalleryPage = () => {
  const { galleryItems, loading, error } = useGallery();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const navigate = useNavigate();

  // Process all images for the masonry grid view
  const allImages = galleryItems.reduce((acc, item) => {
    return [
      ...acc,
      ...item.images.map((image) => {
        const imageUrl =
          typeof image === "object"
            ? image.url
            : `${API_BASE_URL}/uploads/${image}`;

        return {
          src: imageUrl,
          title: item.title,
          date: item.date,
          itemId: item._id,
          formattedDate: new Date(item.date).toLocaleDateString(),
        };
      }),
    ];
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const handleItemClick = (itemId) => {
    navigate(`/gallery/event/${itemId}`);
  };

  const handleEditItem = (itemId, e) => {
    e.stopPropagation();
    const item = galleryItems.find((item) => item._id === itemId);
    setItemToEdit(item);
    setShowForm(true);
  };

  if (loading) return <div className="loading">Loading gallery...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Photo Gallery
        </motion.h1>

        <div className="gallery-controls">
          <motion.button
            className={`view-mode-btn ${viewMode === "all" ? "active" : ""}`}
            onClick={() => setViewMode("all")}
            whileHover={{ scale: 1.05 }}
          >
            All Photos
          </motion.button>
          <motion.button
            className={`view-mode-btn ${viewMode === "event" ? "active" : ""}`}
            onClick={() => setViewMode("event")}
            whileHover={{ scale: 1.05 }}
          >
            By Event
          </motion.button>
          <motion.button
            className="add-memory-btn"
            onClick={() => {
              setItemToEdit(null);
              setShowForm(true);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Gallery Item
          </motion.button>
        </div>
      </div>

      {viewMode === "event" ? (
        <div className="events-container">
          {galleryItems.map((item) => {
            // Get the first image URL
            const firstImage = item.images[0];
            const imageUrl =
              typeof firstImage === "object"
                ? firstImage.url
                : `${API_BASE_URL}/uploads/${firstImage}`;

            return (
              <motion.div
                key={item._id}
                className="event-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleItemClick(item._id)}
              >
                <div className="event-card-header">
                  <h3>{item.title}</h3>
                  <button
                    className="edit-btn"
                    onClick={(e) => handleEditItem(item._id, e)}
                  >
                    Edit
                  </button>
                </div>
                <p className="event-date">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <div className="event-preview-images">
                  <motion.img
                    src={imageUrl}
                    alt={`Event Preview`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                  {item.images.length > 1 && (
                    <div className="more-photos">
                      +{item.images.length - 1} more
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {allImages.map((image, index) => (
            <motion.div
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            >
              <img
                src={image.src}
                alt={`Gallery ${index + 1}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.jpg";
                }}
              />
              <div className="image-overlay">
                <h3>{image.title}</h3>
                <p>{image.formattedDate}</p>
              </div>
            </motion.div>
          ))}
        </Masonry>
      )}

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
          imageCaption={allImages[photoIndex].formattedDate}
        />
      )}

      {showForm && (
        <GalleryForm
          itemToEdit={itemToEdit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default GalleryPage;
