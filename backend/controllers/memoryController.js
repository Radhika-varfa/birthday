// const Memory = require("../models/Memory");
// const fs = require("fs");
// const path = require("path");

// // Create uploads directory if it doesn't exist
// const uploadDir = path.join(__dirname, "../public/uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// // Middleware to check DB connection
// const checkDbConnection = (req, res, next) => {
//   if (mongoose.connection.readyState !== 1) {
//     return res.status(503).json({
//       message: "Database not connected",
//       error: "Service unavailable",
//     });
//   }
//   next();
// };

// // Get all memories (with connection check)
// exports.getAllMemories = [
//   checkDbConnection,
//   async (req, res) => {
//     try {
//       const memories = await Memory.find().sort({ date: -1 }).maxTimeMS(10000); // 10s timeout

//       const memoriesWithFullUrls = memories.map((memory) => ({
//         ...memory.toObject(),
//         images: memory.images.map(
//           (img) => `${req.protocol}://${req.get("host")}${img}`
//         ),
//       }));

//       res.status(200).json(memoriesWithFullUrls);
//     } catch (err) {
//       res.status(500).json({
//         message: "Failed to fetch memories",
//         error: err.message,
//         dbStatus: mongoose.connection.readyState,
//       });
//     }
//   },
// ];

// // Get all memories
// // exports.getAllMemories = async (req, res) => {
// //   try {
// //     const memories = await Memory.find().sort({ date: -1 });
// //     res.json(memories);
// //   } catch (err) {
// //     console.error("Error fetching memories:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // Get memory by ID
// exports.getMemoryById = async (req, res) => {
//   try {
//     const memory = await Memory.findById(req.params.id);
//     if (!memory) return res.status(404).json({ message: "Memory not found" });
//     res.json(memory);
//   } catch (err) {
//     console.error("Error fetching memory:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Create memory
// // exports.createMemory = async (req, res) => {
// //   try {
// //     console.log("Request files:", req.files);

// //     const { title, description, date, category, coordinates } = req.body;
// //     const images = req.files?.map((file) => `/uploads/${file.filename}`);

// //     const newMemory = new Memory({
// //       title,
// //       description,
// //       date,
// //       images,
// //       location: {
// //         type: "Point",
// //         coordinates: JSON.parse(coordinates),
// //       },
// //       category,
// //     });

// //     await newMemory.save();
// //     res.status(201).json(newMemory);
// //   } catch (err) {
// //     console.error("Error creating memory:", err);
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// // memoryController.js
// exports.createMemory = async (req, res) => {
//   try {
//     const { title, description, date, category } = req.body;
//     const images = req.files?.map((file) => `/uploads/${file.filename}`);

//     const newMemory = new Memory({
//       title,
//       description,
//       date,
//       images,
//       // location: {
//       //   type: "Point",
//       //   coordinates: JSON.parse(coordinates),
//       // },
//       category,
//     });

//     await newMemory.save();
//     res.status(201).json(newMemory);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
// // Similarly update other controller methods to remove auth checks
// // Update memory
// exports.updateMemory = async (req, res) => {
//   try {
//     const { title, description, date, category } = req.body;
//     const newImages = req.files?.map((file) => `/uploads/${file.filename}`);

//     const updatedData = {
//       title,
//       description,
//       date,
//       category,
//       // location: {
//       //   type: "Point",
//       //   coordinates: JSON.parse(coordinates),
//       // },
//     };

//     if (newImages && newImages.length > 0) {
//       updatedData.$push = { images: { $each: newImages } };
//     }

//     const updatedMemory = await Memory.findByIdAndUpdate(
//       req.params.id,
//       updatedData,
//       { new: true }
//     );

//     if (!updatedMemory)
//       return res.status(404).json({ message: "Memory not found" });
//     res.json(updatedMemory);
//   } catch (err) {
//     console.error("Error updating memory:", err);
//     res.status(400).json({ message: err.message });
//   }
// };

// // Delete memory
// exports.deleteMemory = async (req, res) => {
//   try {
//     const memory = await Memory.findById(req.params.id);
//     if (!memory) return res.status(404).json({ message: "Memory not found" });

//     // Delete associated images
//     memory.images.forEach((image) => {
//       const imagePath = path.join(__dirname, "../public", image);
//       if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//     });

//     await memory.remove();
//     res.json({ message: "Memory deleted" });
//   } catch (err) {
//     console.error("Error deleting memory:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

const mongoose = require("mongoose");
const Memory = require("../models/Memory");
const fs = require("fs");
const path = require("path");

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Get all memories
exports.getAllMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ date: -1 }).maxTimeMS(10000);

    // Convert to full URLs
    const memoriesWithFullUrls = memories.map((memory) => ({
      ...memory.toObject(),
      images: memory.images.map(
        (img) => `${req.protocol}://${req.get("host")}${img}`
      ),
    }));

    res.status(200).json(memoriesWithFullUrls);
  } catch (err) {
    console.error("Error fetching memories:", err);
    res.status(500).json({
      message: "Failed to fetch memories",
      error: err.message,
      dbStatus: mongoose.connection.readyState,
    });
  }
};

// Get memory by ID
exports.getMemoryById = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    // Convert to full URLs
    const memoryWithFullUrls = {
      ...memory.toObject(),
      images: memory.images.map(
        (img) => `${req.protocol}://${req.get("host")}${img}`
      ),
    };

    res.status(200).json(memoryWithFullUrls);
  } catch (err) {
    console.error("Error fetching memory:", err);
    res.status(500).json({ message: err.message });
  }
};

// Create memory
exports.createMemory = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const newMemory = new Memory({
      title,
      description,
      date,
      images,
      category,
    });

    await newMemory.save();

    // Return with full URLs
    const memoryWithFullUrls = {
      ...newMemory.toObject(),
      images: images.map((img) => `${req.protocol}://${req.get("host")}${img}`),
    };

    res.status(201).json(memoryWithFullUrls);
  } catch (err) {
    console.error("Error creating memory:", err);

    // Clean up uploaded files if error occurs
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const filePath = path.join(uploadDir, file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    res.status(400).json({
      message: err.message,
      details: err.errors
        ? Object.values(err.errors).map((e) => e.message)
        : null,
    });
  }
};

// Update memory
exports.updateMemory = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;
    const memoryId = req.params.id;

    const memory = await Memory.findById(memoryId);
    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    // Handle new images
    let newImagePaths = [];
    if (req.files && req.files.length > 0) {
      newImagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedData = {
      title: title || memory.title,
      description: description || memory.description,
      date: date || memory.date,
      category: category || memory.category,
      images:
        newImagePaths.length > 0
          ? [...memory.images, ...newImagePaths]
          : memory.images,
    };

    const updatedMemory = await Memory.findByIdAndUpdate(
      memoryId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    // Return with full URLs
    const memoryWithFullUrls = {
      ...updatedMemory.toObject(),
      images: updatedMemory.images.map(
        (img) => `${req.protocol}://${req.get("host")}${img}`
      ),
    };

    res.status(200).json(memoryWithFullUrls);
  } catch (err) {
    console.error("Error updating memory:", err);
    res.status(400).json({
      message: "Failed to update memory",
      error: err.message,
    });
  }
};

// Delete memory
exports.deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    // Delete associated images
    memory.images.forEach((image) => {
      const imagePath = path.join(__dirname, "../public", image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    await Memory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Memory deleted successfully" });
  } catch (err) {
    console.error("Error deleting memory:", err);
    res.status(500).json({
      message: "Failed to delete memory",
      error: err.message,
    });
  }
};
