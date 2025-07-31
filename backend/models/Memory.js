const mongoose = require("mongoose");

const MemorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  images: [String],
  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     required: true
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true
  //   }
  // },
  category: {
    type: String,
    enum: ["roka", "anniversary", "trip", "birthday", "other"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

MemorySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Memory", MemorySchema);
