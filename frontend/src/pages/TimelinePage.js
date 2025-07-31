// import { useContext, useState } from "react";
// import { MemoryContext } from "../context/MemoryContext";
// import { motion } from "framer-motion";
// import MemoryForm from "../pages/MemoryForm";
// import "../styles/TimelinePage.css";

// const TimelinePage = () => {
//   const { memories, loading, deleteMemory } = useContext(MemoryContext);
//   const [showForm, setShowForm] = useState(false);
//   const [memoryToEdit, setMemoryToEdit] = useState(null);
//   console.log("memory++", memories);
//   if (loading) return <div className="loading">Loading memories...</div>;

//   return (
//     <div className="timeline-page">
//       <div className="header-container">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Our Timeline
//         </motion.h1>
//         <motion.button
//           className="add-memory-btn"
//           onClick={() => {
//             setMemoryToEdit(null);
//             setShowForm(true);
//           }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           + Add Memory
//         </motion.button>
//       </div>

//       {!memories || memories.length === 0 ? (
//         <div className="empty-state">
//           <p className="no-memories">No memories found</p>
//           <button
//             className="add-first-memory-btn"
//             onClick={() => {
//               setMemoryToEdit(null);
//               setShowForm(true);
//             }}
//           >
//             Add Your First Memory
//           </button>
//         </div>
//       ) : (
//         <div className="timeline">
//           {memories.map((memory, index) => (
//             <motion.div
//               key={memory._id}
//               className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
//               initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//             >
//               <div className="timeline-content">
//                 <div className="timeline-actions">
//                   <button
//                     className="edit-btn"
//                     onClick={() => {
//                       setMemoryToEdit(memory);
//                       setShowForm(true);
//                     }}
//                   >
//                     Edit
//                   </button>
//                 </div>
//                 <div className="timeline-date">
//                   {new Date(memory.date).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </div>
//                 <h3>{memory.title}</h3>
//                 <div className="timeline-category">{memory.category}</div>
//                 <p>{memory.description}</p>

//                 {memory.images.length > 0 && (
//                   <div className="timeline-images">
//                     {memory.images.map((image, idx) => (
//                       <motion.div
//                         key={idx}
//                         className="image-container"
//                         whileHover={{ scale: 1.05 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <img
//                           src={image}
//                           alt={`Memory ${idx + 1}`}
//                           className="round-image"
//                         />
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {showForm && (
//         <MemoryForm
//           memoryToEdit={memoryToEdit}
//           onClose={() => setShowForm(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default TimelinePage;

import { useContext, useState } from "react";
import { MemoryContext } from "../context/MemoryContext";
import { motion } from "framer-motion";
import MemoryForm from "../pages/MemoryForm";
import "../styles/TimelinePage.css";

const TimelinePage = () => {
  const { memories, loading, deleteMemory } = useContext(MemoryContext);
  const [showForm, setShowForm] = useState(false);
  const [memoryToEdit, setMemoryToEdit] = useState(null);

  if (loading) return <div className="loading">Loading memories...</div>;

  return (
    <div className="timeline-page">
      <div className="header-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Timeline
        </motion.h1>
        <motion.button
          className="add-memory-btn"
          onClick={() => {
            setMemoryToEdit(null);
            setShowForm(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Add Memory
        </motion.button>
      </div>

      {!memories || memories.length === 0 ? (
        <div className="empty-state">
          <p className="no-memories">No memories found</p>
          <button
            className="add-first-memory-btn"
            onClick={() => {
              setMemoryToEdit(null);
              setShowForm(true);
            }}
          >
            Add Your First Memory
          </button>
        </div>
      ) : (
        <div className="timeline">
          {memories.map((memory, index) => (
            <motion.div
              key={memory._id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="timeline-content">
                <div className="timeline-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setMemoryToEdit(memory);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  {/* <button
                    className="delete-btn"
                    onClick={() => deleteMemory(memory._id)}
                  >
                    Delete
                  </button> */}
                </div>
                <div className="timeline-date">
                  {new Date(memory.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h3>{memory.title}</h3>
                <div className="timeline-category">{memory.category}</div>
                <p>{memory.description}</p>

                {memory.images && memory.images.length > 0 && (
                  <div className="timeline-images">
                    {memory.images.map((image, idx) => (
                      <motion.div
                        key={idx}
                        className="image-container"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={image}
                          alt={`Memory ${idx + 1}`}
                          className="round-image"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showForm && (
        <MemoryForm
          memoryToEdit={memoryToEdit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default TimelinePage;
