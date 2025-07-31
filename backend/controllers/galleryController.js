const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

// Helper function to format image paths
const formatImagePath = (file) => {
  return file.filename; // Just store the filename
};

exports.getGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });

    const itemsWithUrls = galleryItems.map((item) => ({
      ...item.toObject(),
      images: item.images.map((img) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/${img}`,
        filename: img,
      })),
    }));

    res.status(200).json(itemsWithUrls);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    const itemWithUrls = {
      ...galleryItem.toObject(),
      images: galleryItem.images.map((img) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/${img}`,
        filename: img,
      })),
    };

    res.status(200).json(itemWithUrls);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createGalleryItem = async (req, res) => {
  try {
    const { title, date } = req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }

    const images = req.files.map((file) => formatImagePath(file));

    const galleryItem = new Gallery({
      title,
      images,
      date: date || Date.now(),
    });

    await galleryItem.save();

    const itemWithUrls = {
      ...galleryItem.toObject(),
      images: galleryItem.images.map((img) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/${img}`,
        filename: img,
      })),
    };

    res.status(201).json(itemWithUrls);
  } catch (err) {
    console.error(err);

    // Clean up uploaded files if error occurs
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const filePath = path.join(
          __dirname,
          "../public/uploads",
          file.filename
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateGalleryItem = async (req, res) => {
  try {
    const { title, date } = req.body;
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    // Handle new images
    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map((file) => formatImagePath(file));
    }

    // Update fields
    galleryItem.title = title || galleryItem.title;
    galleryItem.date = date || galleryItem.date;

    // Combine old and new images if not replacing
    galleryItem.images = [...galleryItem.images, ...newImages];

    await galleryItem.save();

    const itemWithUrls = {
      ...galleryItem.toObject(),
      images: galleryItem.images.map((img) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/${img}`,
        filename: img,
      })),
    };

    res.status(200).json(itemWithUrls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    // Delete associated images
    galleryItem.images.forEach((image) => {
      const imagePath = path.join(__dirname, "../public/uploads", image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    await galleryItem.deleteOne();
    res.status(200).json({ message: "Gallery item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
