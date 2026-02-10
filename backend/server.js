// // require("dotenv").config();
// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const memoryRoutes = require("./routes/memoryRoutes");
// // const userRoutes = require("./routes/userRoutes");

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.static("public"));

// // // Routes
// // app.use("/api/memories", memoryRoutes);
// // app.use("/api/user", userRoutes);

// // // Database connection
// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log("Connected to database");
// //     const PORT = process.env.PORT || 5000;
// //     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// //   })
// //   .catch((err) => console.log("Database connection error:", err));

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const cors = require("cors");
// const memoryRoutes = require("./routes/memoryRoutes");
// const userRoutes = require("./routes/userRoutes");
// const galleryRoutes = require("./routes/galleryRoutes");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// // Routes
// app.use("/api/memories", memoryRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/gallery", galleryRoutes);

// // Database connection with error handling
// const connectDB = async () => {
//   try {
//     // Use 127.0.0.1 instead of localhost to avoid IPv6 issues
//     const MONGO_URI =
//       process.env.MONGO_URI || "mongodb://127.0.0.1:27017/memoryApp";

//     await mongoose.connect(MONGO_URI, {
//       serverSelectionTimeoutMS: 5000, // 5 seconds timeout
//       socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
//     });

//     console.log("Connected to MongoDB successfully");

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1); // Exit with failure
//   }
// };

// // Initialize connection
// connectDB();

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: "Something went wrong!",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined,
//   });
// });

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const cors = require("cors");
// const multer = require("multer"); // Added for Multer error handling
// const memoryRoutes = require("./routes/memoryRoutes");
// const userRoutes = require("./routes/userRoutes");
// const galleryRoutes = require("./routes/galleryRoutes");

// const app = express();

// // Middleware Configuration
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

// // Increased payload limits for JSON and urlencoded
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // Static files
// app.use(express.static(path.join(__dirname, "public")));

// // Routes
// app.use("/api/memories", memoryRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/gallery", galleryRoutes);

// // Static file serving with logging
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "public/uploads"), {
//     setHeaders: (res, path) => {
//       console.log(`Serving file: ${path}`);
//     },
//   })
// );

// // Database connection with enhanced error handling
// const connectDB = async () => {
//   try {
//     const MONGO_URI =
//       process.env.MONGO_URI || "mongodb://127.0.0.1:27017/memoryApp";

//     await mongoose.connect(MONGO_URI, {
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000,
//       maxPoolSize: 50, // Increased connection pool size
//     });

//     console.log("Connected to MongoDB successfully");

//     const PORT = process.env.PORT || 5000;
//     const server = app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//     // Increase server timeout for large uploads
//     server.timeout = 600000; // 10 minutes
//   } catch (err) {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// // Initialize connection
// connectDB();

// // Enhanced error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);

//   // Handle Multer errors specifically
//   if (err instanceof multer.MulterError) {
//     return res.status(413).json({
//       message: "File upload error",
//       error:
//         err.code === "LIMIT_FILE_SIZE"
//           ? "File too large (max 10MB per file)"
//           : err.message,
//       details: process.env.NODE_ENV === "development" ? err.stack : undefined,
//     });
//   }

//   // Handle other errors
//   res.status(500).json({
//     message: "Something went wrong!",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined,
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Rejection:", err);
//   // Optionally exit the process
//   // process.exit(1);
// });

// // Handle uncaught exceptions
// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err);
//   // Optionally exit the process
//   // process.exit(1);
// });

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const memoryRoutes = require("./routes/memoryRoutes");
const userRoutes = require("./routes/userRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

/* -------------------- Middleware -------------------- */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.static(path.join(__dirname, "public")));

/* -------------------- Routes -------------------- */
app.use("/api/memories", memoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/gallery", galleryRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

/* -------------------- Database -------------------- */
const connectDB = async () => {
  const MONGO_URI = process.env.MONGODB_URI;

  if (!MONGO_URI) {
    console.error("❌ MONGODB_URI is missing");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    server.timeout = 600000;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

/* -------------------- Error Handling -------------------- */
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    return res.status(413).json({
      message: "File upload error",
      error: err.message,
    });
  }

  res.status(500).json({
    message: "Something went wrong",
  });
});

/* -------------------- Process Safety -------------------- */
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
