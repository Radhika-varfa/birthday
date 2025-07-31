// import { useContext, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { MemoryContext } from "../context/MemoryContext";
// import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";
// import { motion } from "framer-motion";
// import "../styles/MemoryDetailPage.css";

// const MemoryDetailPage = () => {
//   const { memoryId } = useParams();
//   const { memories } = useContext(MemoryContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const [photoIndex, setPhotoIndex] = useState(0);
//   const navigate = useNavigate();

//   const memory = memories.find(m => m._id === memoryId);

//   if (!memory) {
//     return <div className="not-found">Memory not found</div>;
//   }

//   return (
//     <div className="memory-detail-page">
//       <motion.div
//         className="back-button"
//         onClick={() => navigate(-1)}
//         whileHover={{ scale: 1.05 }}
//       >
//         ← Back to Gallery
//       </motion.div>

//       <motion.div
//         className="memory-header"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h1>{memory.title}</h1>
//         <p className="memory-date">
//           {new Date(memory.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric"
//           })}
//         </p>
//       </motion.div>

//       <div className="memory-images-grid">
//         {memory.images.map((image, index) => (
//           <motion.div
//             key={index}
//             className="memory-image-container"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: index * 0.05 }}
//             onClick={() => {
//               setPhotoIndex(index);
//               setIsOpen(true);
//             }}
//           >
//             <img src={image} alt={`${memory.title} ${index + 1}`} />
//           </motion.div>
//         ))}
//       </div>

//       {isOpen && (
//         <Lightbox
//           mainSrc={memory.images[photoIndex]}
//           nextSrc={memory.images[(photoIndex + 1) % memory.images.length]}
//           prevSrc={
//             memory.images[(photoIndex + memory.images.length - 1) % memory.images.length]
//           }
//           onCloseRequest={() => setIsOpen(false)}
//           onMovePrevRequest={() =>
//             setPhotoIndex(
//               (photoIndex + memory.images.length - 1) % memory.images.length
//             )
//           }
//           onMoveNextRequest={() =>
//             setPhotoIndex((photoIndex + 1) % memory.images.length)
//           }
//           imageTitle={memory.title}
//           imageCaption={new Date(memory.date).toLocaleDateString()}
//         />
//       )}
//     </div>
//   );
// };

// export default MemoryDetailPage;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGallery } from "../context/GalleryContext";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { motion } from "framer-motion";
import "../styles/MemoryDetailPage.css";

const GalleryDetailPage = () => {
  const { galleryItems } = useGallery();
  const { itemId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const navigate = useNavigate();

  const galleryItem = galleryItems.find(item => item._id === itemId);

  if (!galleryItem) {
    return <div className="not-found">Gallery item not found</div>;
  }

  return (
    <div className="memory-detail-page">
      <motion.div
        className="back-button"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
      >
        ← Back to Gallery
      </motion.div>

      <motion.div
        className="memory-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>{galleryItem.title}</h1>
        <p className="memory-date">
          {new Date(galleryItem.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </p>
      </motion.div>

      <div className="memory-images-grid">
        {galleryItem.images.map((image, index) => (
          <motion.div
            key={index}
            className="memory-image-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
          >
            <img src={image} alt={`${galleryItem.title} ${index + 1}`} />
          </motion.div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={galleryItem.images[photoIndex]}
          nextSrc={galleryItem.images[(photoIndex + 1) % galleryItem.images.length]}
          prevSrc={
            galleryItem.images[(photoIndex + galleryItem.images.length - 1) % galleryItem.images.length]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + galleryItem.images.length - 1) % galleryItem.images.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % galleryItem.images.length)
          }
          imageTitle={galleryItem.title}
          imageCaption={new Date(galleryItem.date).toLocaleDateString()}
        />
      )}
    </div>
  );
};

export default GalleryDetailPage;