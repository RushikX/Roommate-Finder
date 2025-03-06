// server/models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  languagesKnown: {
    type: [String],
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  yearOfStudy: {
    type: Number,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
  contactDetails: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
