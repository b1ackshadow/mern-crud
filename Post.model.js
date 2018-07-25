const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body: String,
  author: String,
  date: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Post", postSchema);
