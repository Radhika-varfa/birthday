// const mongoose = require("mongoose");

// const gallerySchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   images: [
//     {
//       filename: String,
//       path: String,
//       uploadedAt: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Gallery", gallerySchema);

const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of strings (filenames)
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Gallery", gallerySchema);
