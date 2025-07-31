// const express = require("express");
// const router = express.Router();
// const memoryController = require("../controllers/memoryController");
// const multer = require("multer");
// const auth = require("../middleware/auth");

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.get("/", memoryController.getAllMemories);
// router.get("/:id", memoryController.getMemoryById);
// router.post("/", auth, upload.array("images"), memoryController.createMemory);
// router.put("/:id", auth, upload.array("images"), memoryController.updateMemory);
// router.delete("/:id", auth, memoryController.deleteMemory);

// module.exports = router;

// memoryRoutes.js
const express = require("express");
const router = express.Router();
const memoryController = require("../controllers/memoryController");
const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });

// Remove auth middleware from all routes
router.get("/", memoryController.getAllMemories);
router.get("/:id", memoryController.getMemoryById);
router.post("/", upload.array("images"), memoryController.createMemory); // Removed auth
router.put("/:id", upload.array("images"), memoryController.updateMemory); // Removed auth
router.delete("/:id", memoryController.deleteMemory); // Removed auth

module.exports = router;
