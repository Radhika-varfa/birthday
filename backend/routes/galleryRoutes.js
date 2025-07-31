const express = require("express");
const router = express.Router();
const {
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");
const upload = require("../config/multer");

// Public routes
router
  .route("/")
  .get(getGalleryItems)
  .post(upload.array("images"), createGalleryItem); // Removed protect middleware

router
  .route("/:id")
  .get(getGalleryItem)
  .put(upload.array("images"), updateGalleryItem) // Removed protect middleware
  .delete(deleteGalleryItem); // Removed protect middleware

module.exports = router;
