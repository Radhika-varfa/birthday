import { useContext } from "react";
import { MemoryContext } from "../../context/MemoryContext";
import { motion } from "framer-motion";
import "../TimeLine/TimeLine.css";

const Timeline = () => {
  const { memories, loading } = useContext(MemoryContext);

  if (loading) return <div className="loading">Loading memories...</div>;

  return (
    <div className="timeline-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Journey Timeline
      </motion.h1>

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

              {memory.images.length > 0 && (
                <div className="timeline-images">
                  {memory.images.map((image, idx) => (
                    <motion.img
                      key={idx}
                      src={image}
                      alt={`Memory ${idx + 1}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
