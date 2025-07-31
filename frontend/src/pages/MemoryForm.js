// import { useState, useContext } from "react";
// import axios from "axios";
// import { MemoryContext } from "../context/MemoryContext";
// import { motion } from "framer-motion";
// import "../styles/MemoryForm.css";

// const API_BASE_URL =
//   process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// const MemoryForm = ({ memoryToEdit, onClose }) => {
//   const { addMemory, updateMemory } = useContext(MemoryContext);
//   const [formData, setFormData] = useState({
//     title: memoryToEdit?.title || "",
//     description: memoryToEdit?.description || "",
//     date: memoryToEdit?.date?.split("T")[0] || "",
//     category: memoryToEdit?.category || "other",
//     // coordinates: memoryToEdit?.location?.coordinates || [0, 0],
//   });
//   const [files, setFiles] = useState([]);
//   const [previewImages, setPreviewImages] = useState(
//     memoryToEdit?.images || []
//   );
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
//   //     formDataToSend.append("description", formData.description);
//   //     formDataToSend.append("date", formData.date);
//   //     formDataToSend.append("category", formData.category);
//   //     //   formDataToSend.append(
//   //     //     "coordinates",
//   //     //     JSON.stringify(formData.coordinates)
//   //     //   );

//   //     files.forEach((file) => {
//   //       formDataToSend.append("images", file);
//   //     });

//   //     const config = {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //         Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //       },
//   //     };

//   //     let response;
//   //     if (memoryToEdit) {
//   //       response = await axios.put(
//   //         `${API_BASE_URL}/memories/${memoryToEdit._id}`,
//   //         formDataToSend,
//   //         config
//   //       );
//   //       updateMemory(response.data);
//   //     } else {
//   //       response = await axios.post(
//   //         `${API_BASE_URL}/memories`,
//   //         formDataToSend,
//   //         config
//   //       );
//   //       addMemory(response.data);
//   //     }

//   //     onClose();
//   //   } catch (err) {
//   //     console.error("Submission error:", err);
//   //     setError(
//   //       err.response?.data?.message ||
//   //         err.message ||
//   //         "Failed to save memory. Please try again."
//   //     );
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

//       // Append all fields with validation
//       formDataToSend.append("title", formData.title || "");
//       formDataToSend.append("description", formData.description || "");
//       formDataToSend.append(
//         "date",
//         formData.date ? new Date(formData.date).toISOString() : ""
//       );
//       formDataToSend.append("category", formData.category || "");

//       // Append each file with validation
//       if (files && files.length > 0) {
//         files.forEach((file) => {
//           formDataToSend.append("images", file);
//         });
//       }

//       // Debug: Log FormData contents
//       console.log("--- FormData Contents ---");
//       for (let [key, value] of formDataToSend.entries()) {
//         console.log(`${key}:`, value);
//       }

//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/memories`,
//         formDataToSend,
//         config
//       );

//       console.log("Success:", response.data);
//       addMemory(response.data.data);
//       onClose();
//     } catch (err) {
//       console.error("Full error:", err);
//       console.error("Error response data:", err.response?.data);
//       console.error("Error response status:", err.response?.status);
//       console.error("Error response headers:", err.response?.headers);

//       const errorMessage =
//         err.response?.data?.message ||
//         err.response?.data?.error ||
//         (err.response?.data?.errors
//           ? err.response.data.errors.join(", ")
//           : "") ||
//         "Failed to save memory. Please try again.";

//       console.error("User-friendly error:", errorMessage);
//       setError(errorMessage);
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
//         <h2>{memoryToEdit ? "Edit Memory" : "Add New Memory"}</h2>

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
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
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
//             <label>Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//             >
//               <option value="roka">Roka</option>
//               <option value="anniversary">Anniversary</option>
//               <option value="trip">Trip</option>
//               <option value="birthday">Birthday</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           {/* 
//           <div className="form-group">
//             <label>Location (Latitude, Longitude)</label>
//             <div className="coordinates-input">
//               <input
//                 type="number"
//                 placeholder="Latitude"
//                 value={formData.coordinates[1]}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     coordinates: [
//                       prev.coordinates[0],
//                       parseFloat(e.target.value),
//                     ],
//                   }))
//                 }
//                 step="0.000001"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Longitude"
//                 value={formData.coordinates[0]}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     coordinates: [
//                       parseFloat(e.target.value),
//                       prev.coordinates[1],
//                     ],
//                   }))
//                 }
//                 step="0.000001"
//                 required
//               />
//             </div>
//           </div> */}

//           <div className="form-group">
//             <label>Images</label>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageChange}
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
//             {loading ? "Saving..." : "Save Memory"}
//           </button>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default MemoryForm;

import { useState, useContext } from "react";
import axios from "axios";
import { MemoryContext } from "../context/MemoryContext";
import { motion } from "framer-motion";
import "../styles/MemoryForm.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const MemoryForm = ({ memoryToEdit, onClose }) => {
  const { addMemory, updateMemory } = useContext(MemoryContext);
  const [formData, setFormData] = useState({
    title: memoryToEdit?.title || "",
    description: memoryToEdit?.description || "",
    date: memoryToEdit?.date?.split("T")[0] || "",
    category: memoryToEdit?.category || "other",
  });
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState(memoryToEdit?.images || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);

    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFiles(prev => prev.filter((_, i) => i !== index - (previewImages.length - files.length)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("category", formData.category);

      files.forEach(file => {
        formDataToSend.append("images", file);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      let response;
      if (memoryToEdit) {
        response = await axios.put(
          `${API_BASE_URL}/memories/${memoryToEdit._id}`,
          formDataToSend,
          config
        );
        updateMemory(response.data);
      } else {
        response = await axios.post(
          `${API_BASE_URL}/memories`,
          formDataToSend,
          config
        );
        addMemory(response.data);
      }

      onClose();
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to save memory. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="memory-form-overlay">
      <motion.div className="memory-form">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{memoryToEdit ? "Edit Memory" : "Add New Memory"}</h2>

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
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
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
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="roka">Roka</option>
              <option value="anniversary">Anniversary</option>
              <option value="trip">Trip</option>
              <option value="birthday">Birthday</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div className="image-previews">
              {previewImages.map((img, index) => (
                <div key={index} className="image-preview">
                  <img src={img} alt={`Preview ${index}`} />
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
            {loading ? "Saving..." : "Save Memory"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MemoryForm;