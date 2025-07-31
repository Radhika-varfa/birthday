// import { useState } from "react";
// import { useGallery } from "../context/GalleryContext";
// import { motion } from "framer-motion";
// import "../styles/MemoryForm.css";

// const GalleryForm = ({ itemToEdit, onClose }) => {
//   const { createGalleryItem, updateGalleryItem } = useGallery();
//   const [formData, setFormData] = useState({
//     title: itemToEdit?.title || "",
//     date: itemToEdit?.date?.split("T")[0] || "",
//   });
//   const [files, setFiles] = useState([]);
//   const [previewImages, setPreviewImages] = useState(itemToEdit?.images || []);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const newFiles = Array.from(e.target.files);
//     setFiles((prev) => [...prev, ...newFiles]);

//     const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
//     setPreviewImages((prev) => [...prev, ...newPreviews]);
//   };

//   const removeImage = (index) => {
//     setPreviewImages((prev) => prev.filter((_, i) => i !== index));
//     setFiles((prev) =>
//       prev.filter((_, i) => i !== index - (previewImages.length - files.length))
//     );
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError("");

//   //   try {
//   //     const formDataToSend = new FormData();
//   //     formDataToSend.append("title", formData.title);
//   //     formDataToSend.append("date", formData.date);

//   //     files.forEach((file) => {
//   //       formDataToSend.append("images", file);
//   //     });

//   //     if (itemToEdit) {
//   //       await updateGalleryItem(itemToEdit._id, formDataToSend);
//   //     } else {
//   //       await createGalleryItem(formDataToSend);
//   //     }

//   //     onClose();
//   //   } catch (err) {
//   //     setError(err.message || "Failed to save gallery item");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("date", formData.date);

//       // Append each file individually
//       files.forEach((file) => {
//         formDataToSend.append("images", file);
//       });

//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       if (itemToEdit) {
//         await updateGalleryItem(itemToEdit._id, formDataToSend, config);
//       } else {
//         await createGalleryItem(formDataToSend, config);
//       }

//       onClose();
//     } catch (err) {
//       setError(err.message || "Failed to save gallery item");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <motion.div
//       className="memory-form-overlay"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="memory-form"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 50, opacity: 0 }}
//       >
//         <button className="close-btn" onClick={onClose}>
//           ×
//         </button>
//         <h2>{itemToEdit ? "Edit Gallery Item" : "Add New Gallery Item"}</h2>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Date</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Images</label>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageChange}
//               required={!itemToEdit}
//             />
//             <div className="image-previews">
//               {previewImages.map((img, index) => (
//                 <div key={index} className="image-preview">
//                   <img src={img} alt={`Preview ${index}`} />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="remove-image"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Saving..." : "Save Gallery Item"}
//           </button>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default GalleryForm;

import { useState } from "react";
import { useGallery } from "../context/GalleryContext";
import { motion } from "framer-motion";
import "../styles/MemoryForm.css";

const GalleryForm = ({ itemToEdit, onClose }) => {
  const { createGalleryItem, updateGalleryItem } = useGallery();
  const [formData, setFormData] = useState({
    title: itemToEdit?.title || "",
    date: itemToEdit?.date?.split("T")[0] || "",
  });
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState(itemToEdit?.images || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    
    // Validate file types and sizes before adding
    const validFiles = newFiles.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        setError(`Invalid file type: ${file.name}. Only JPEG, PNG, GIF, WEBP are allowed.`);
        return false;
      }
      if (!isValidSize) {
        setError(`File too large: ${file.name}. Max size is 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setFiles((prev) => [...prev, ...validFiles]);
    setError("");

    // Create previews for valid files
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    // Revoke the object URL to prevent memory leaks
    if (index < previewImages.length - files.length) {
      // This is an existing image (from itemToEdit)
      setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // This is a new file that was just added
      const fileIndex = index - (previewImages.length - files.length);
      URL.revokeObjectURL(previewImages[index]);
      setPreviewImages((prev) => prev.filter((_, i) => i !== index));
      setFiles((prev) => prev.filter((_, i) => i !== fileIndex));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate at least one image is present (for new items)
    if (!itemToEdit && files.length === 0 && previewImages.length === 0) {
      setError("Please upload at least one image");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("date", formData.date);

      // Append all files at once
      files.forEach((file) => {
        formDataToSend.append("images", file);
      });

      if (itemToEdit) {
        await updateGalleryItem(itemToEdit._id, formDataToSend);
      } else {
        await createGalleryItem(formDataToSend);
      }

      // Clean up object URLs
      previewImages.forEach((img) => {
        if (img.startsWith('blob:')) {
          URL.revokeObjectURL(img);
        }
      });

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to save gallery item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="memory-form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="memory-form"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>{itemToEdit ? "Edit Gallery Item" : "Add New Gallery Item"}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Images</label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif, image/webp"
              multiple
              onChange={handleImageChange}
              required={!itemToEdit && previewImages.length === 0}
            />
            <small className="file-requirements">
              (Max 10MB per file, JPEG, PNG, GIF, WEBP)
            </small>
            <div className="image-previews">
              {previewImages.map((img, index) => (
                <div key={index} className="image-preview">
                  <img 
                    src={img} 
                    alt={`Preview ${index}`} 
                    onLoad={() => {
                      // Revoke the object URL after the image has loaded
                      if (img.startsWith('blob:')) {
                        URL.revokeObjectURL(img);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="remove-image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Gallery Item"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default GalleryForm;