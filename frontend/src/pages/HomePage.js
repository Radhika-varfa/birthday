// import { motion, useAnimation } from "framer-motion";
// import { useEffect } from "react";
// import "../styles/HomePage.css";

// const HomePage = () => {
//   const letters = "Happy Birthday My Love".split("");
//   const sparkControls = useAnimation();
//   const burstControls = useAnimation();
//   const waveControls = useAnimation();

//   useEffect(() => {
//     // Spark animation (small floating particles)
//     sparkControls.start({
//       y: ["100vh", "-20vh"],
//       opacity: [0, 1, 0],
//       transition: {
//         duration: 3,
//         repeat: Infinity,
//         ease: "linear",
//       },
//     });

//     // Burst animation (firework-like explosions)
//     burstControls.start((i) => ({
//       scale: [0, 1.5, 0],
//       opacity: [0, 1, 0],
//       transition: {
//         duration: 1.5 + Math.random(),
//         repeat: Infinity,
//         repeatDelay: 3 + Math.random() * 5,
//         ease: "easeOut",
//       },
//     }));

//     // Wave animation (circular ripple effect)
//     waveControls.start((i) => ({
//       scale: [0, 3],
//       opacity: [0.8, 0],
//       transition: {
//         duration: 2 + Math.random(),
//         repeat: Infinity,
//         repeatDelay: 2 + Math.random() * 3,
//         ease: "easeOut",
//       },
//     }));
//   }, [sparkControls, burstControls, waveControls]);

//   return (
//     <div className="home-page">
//       {/* Floating Sparks */}
//       {[...Array(80)].map((_, i) => (
//         <motion.div
//           key={`spark-${i}`}
//           className="spark"
//           animate={sparkControls}
//           initial={{ opacity: 0 }}
//           style={{
//             left: `${Math.random() * 100}%`,
//             bottom: 0,
//             width: `${Math.random() * 6 + 2}px`,
//             height: `${Math.random() * 6 + 2}px`,
//             background: `hsl(${Math.random() * 60 + 300}, 100%, 70%)`,
//             position: "absolute",
//             borderRadius: "50%",
//             zIndex: 1,
//             filter: `blur(${Math.random() * 2 + 1}px)`,
//           }}
//           transition={{
//             delay: Math.random() * 3,
//             duration: 2 + Math.random() * 3,
//             repeat: Infinity,
//           }}
//         />
//       ))}

//       {/* Burst Effects (Firework-like) */}
//       {[...Array(15)].map((_, i) => {
//         const size = Math.random() * 20 + 10;
//         const colorAngle = Math.floor(Math.random() * 60 + 300);
//         return (
//           <motion.div
//             key={`burst-${i}`}
//             className="burst"
//             custom={i}
//             animate={burstControls}
//             initial={{ scale: 0 }}
//             style={{
//               left: `${Math.random() * 100}%`,
//               bottom: `${Math.random() * 50 + 10}%`,
//               width: `${size}px`,
//               height: `${size}px`,
//               background: `radial-gradient(circle,
//                 hsl(${colorAngle}, 100%, 70%) 0%,
//                 hsl(${colorAngle + 30}, 100%, 60%) 70%,
//                 transparent 100%)`,
//               position: "absolute",
//               zIndex: 1,
//               borderRadius: "50%",
//               filter: `blur(${Math.random() * 2 + 1}px)`,
//             }}
//           />
//         );
//       })}

//       {/* Wave Ripple Effects */}
//       {[...Array(10)].map((_, i) => {
//         const size = Math.random() * 100 + 50;
//         const colorAngle = Math.floor(Math.random() * 60 + 300);
//         return (
//           <motion.div
//             key={`wave-${i}`}
//             className="wave"
//             custom={i}
//             animate={waveControls}
//             initial={{ scale: 0 }}
//             style={{
//               left: `${Math.random() * 100}%`,
//               bottom: `${Math.random() * 50 + 10}%`,
//               width: `${size}px`,
//               height: `${size}px`,
//               border: `2px solid hsl(${colorAngle}, 100%, 70%)`,
//               position: "absolute",
//               zIndex: 1,
//               borderRadius: "50%",
//               filter: `blur(1px)`,
//             }}
//           />
//         );
//       })}

//       {/* Content */}
//       <div className="content" style={{ position: "relative", zIndex: 2 }}>
//         <motion.div
//           className="birthday-text"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           {letters.map((letter, index) => (
//             <motion.span
//               key={index}
//               className="letter"
//               initial={{ y: 50, opacity: 0, rotate: -10 }}
//               animate={{
//                 y: 0,
//                 opacity: 1,
//                 rotate: 0,
//                 color: [
//                   "#5a3d7a", // Dark purple
//                   "#3a2a4a", // Darker purple
//                   "#4b3869", // Medium purple
//                   "#3a2a4a", // Darker purple
//                   "#5a3d7a", // Dark purple
//                   "#4b3869", // Medium purple
//                   "#5a3d7a", // Dark purple
//                 ],
//                 textShadow: [
//                   "0 0 5px rgba(255,255,255,0.5)",
//                   "0 0 15px rgba(255,255,255,0.8)",
//                   "0 0 5px rgba(255,255,255,0.5)",
//                 ],
//               }}
//               transition={{
//                 delay: index * 0.1,
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 10,
//                 color: {
//                   duration: 8,
//                   repeat: Infinity,
//                   ease: "linear",
//                 },
//                 textShadow: {
//                   duration: 2,
//                   repeat: Infinity,
//                 },
//               }}
//               whileHover={{
//                 scale: 1.5,
//                 rotate: [0, 10, -10, 0],
//                 y: [0, -10, 0],
//                 transition: {
//                   duration: 0.5,
//                   yoyo: Infinity,
//                 },
//               }}
//             >
//               {letter === " " ? "\u00A0" : letter}
//             </motion.span>
//           ))}
//         </motion.div>

//         <motion.div
//           className="subtitle"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{
//             opacity: 1,
//             y: 0,
//             color: "#3a2a4a", // Dark purple
//             textShadow: [
//               "0 0 5px rgba(255,255,255,0.5)",
//               "0 0 15px rgba(255,255,255,0.8)",
//               "0 0 5px rgba(255,255,255,0.5)",
//             ],
//           }}
//           transition={{
//             delay: 2,
//             duration: 1,
//             textShadow: {
//               duration: 3,
//               repeat: Infinity,
//             },
//           }}
//         >
//           A journey of our beautiful memories together
//         </motion.div>

//         {/* Floating Hearts */}
//         <motion.div
//           className="hearts-container"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 3 }}
//         >
//           {[...Array(30)].map((_, i) => (
//             <motion.div
//               key={`heart-${i}`}
//               className="floating-heart"
//               initial={{
//                 y: 0,
//                 x: Math.random() * 100 - 50,
//                 opacity: 0,
//                 scale: Math.random() * 0.5 + 0.5,
//               }}
//               animate={{
//                 y: -100,
//                 opacity: [0, 1, 0],
//                 x: Math.random() * 20 - 10,
//                 rotate: Math.random() * 360,
//               }}
//               transition={{
//                 duration: Math.random() * 8 + 5,
//                 delay: Math.random() * 3,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               style={{
//                 position: "absolute",
//                 fontSize: `${Math.random() * 24 + 12}px`,
//                 color: `hsl(${Math.random() * 60 + 300}, 100%, 70%)`,
//                 filter: `drop-shadow(0 0 5px currentColor)`,
//               }}
//             >
//               {Math.random() > 0.5 ? "❤️" : "✨"}
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/HomePage.css";
import CakeWithCandles from "../components/Cake/CakeWithCandles";

const HomePage = () => {
  const letters = "Blow out each candle with a click—your wish awaits!".split(
    ""
  );
  const sparkControls = useAnimation();
  const burstControls = useAnimation();
  const waveControls = useAnimation();
  const [showCake, setShowCake] = useState(false);

  useEffect(() => {
    // Spark animation
    sparkControls.start({
      y: ["100vh", "-20vh"],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    });

    // Burst animation
    burstControls.start((i) => ({
      scale: [0, 1.5, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5 + Math.random(),
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 5,
        ease: "easeOut",
      },
    }));

    // Wave animation
    waveControls.start((i) => ({
      scale: [0, 3],
      opacity: [0.8, 0],
      transition: {
        duration: 2 + Math.random(),
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 3,
        ease: "easeOut",
      },
    }));

    // Show cake after 3 seconds
    const timer = setTimeout(() => {
      setShowCake(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [sparkControls, burstControls, waveControls]);

  return (
    <div className="home-page">
      {/* Background Effects */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="spark"
          animate={sparkControls}
          initial={{ opacity: 0 }}
          style={{
            left: `${Math.random() * 100}%`,
            bottom: 0,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: `hsl(${Math.random() * 60 + 300}, 100%, 70%)`,
            position: "absolute",
            borderRadius: "50%",
            zIndex: 1,
            filter: `blur(${Math.random() * 2 + 1}px)`,
          }}
          transition={{
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}

      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 20 + 10;
        const colorAngle = Math.floor(Math.random() * 60 + 300);
        return (
          <motion.div
            key={`burst-${i}`}
            className="burst"
            custom={i}
            animate={burstControls}
            initial={{ scale: 0 }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50 + 10}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, 
                hsl(${colorAngle}, 100%, 70%) 0%, 
                hsl(${colorAngle + 30}, 100%, 60%) 70%, 
                transparent 100%)`,
              position: "absolute",
              zIndex: 1,
              borderRadius: "50%",
              filter: `blur(${Math.random() * 2 + 1}px)`,
            }}
          />
        );
      })}

      {[...Array(10)].map((_, i) => {
        const size = Math.random() * 100 + 50;
        const colorAngle = Math.floor(Math.random() * 60 + 300);
        return (
          <motion.div
            key={`wave-${i}`}
            className="wave"
            custom={i}
            animate={waveControls}
            initial={{ scale: 0 }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50 + 10}%`,
              width: `${size}px`,
              height: `${size}px`,
              border: `2px solid hsl(${colorAngle}, 100%, 70%)`,
              position: "absolute",
              zIndex: 1,
              borderRadius: "50%",
              filter: `blur(1px)`,
            }}
          />
        );
      })}

      {/* Main Content */}
      <div className="content" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          className="birthday-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontSize: "2.8rem" }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="letter"
              initial={{ y: 50, opacity: 0, rotate: -10 }}
              animate={{
                y: 0,
                opacity: 1,
                rotate: 0,
                color: [
                  "#5a3d7a",
                  "#3a2a4a",
                  "#4b3869",
                  "#3a2a4a",
                  "#5a3d7a",
                  "#4b3869",
                  "#5a3d7a",
                ],
                textShadow: [
                  "0 0 5px rgba(255,255,255,0.5)",
                  "0 0 15px rgba(255,255,255,0.8)",
                  "0 0 5px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 10,
                color: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
                textShadow: {
                  duration: 2,
                  repeat: Infinity,
                },
              }}
              whileHover={{
                scale: 1.5,
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0],
                transition: {
                  duration: 0.5,
                  yoyo: Infinity,
                },
              }}
              style={{ fontSize: "inherit" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
        {showCake && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            style={{
              margin: "0px auto",
              maxWidth: "350px",
              position: "relative",
              zIndex: 3,
            }}
          >
            <CakeWithCandles />
          </motion.div>
        )}

        <motion.div
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            color: "#3a2a4a", // Dark purple
            textShadow: [
              "0 0 5px rgba(255,255,255,0.5)",
              "0 0 15px rgba(255,255,255,0.8)",
              "0 0 5px rgba(255,255,255,0.5)",
            ],
          }}
          transition={{
            delay: 2,
            duration: 1,
            textShadow: {
              duration: 3,
              repeat: Infinity,
            },
          }}
        >
          A journey of our beautiful memories together
        </motion.div>

        {/* Floating Hearts */}
        <motion.div
          className="hearts-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="floating-heart"
              initial={{
                y: 0,
                x: Math.random() * 100 - 50,
                opacity: 0,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: -100,
                opacity: [0, 1, 0],
                x: Math.random() * 20 - 10,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                fontSize: `${Math.random() * 24 + 12}px`,
                color: `hsl(${Math.random() * 60 + 300}, 100%, 70%)`,
                filter: `drop-shadow(0 0 5px currentColor)`,
              }}
            >
              {Math.random() > 0.5 ? "❤️" : "✨"}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
