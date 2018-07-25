const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body: String,
  author: String,
  date: {
    type: Date,
    default: new Date()
  },
  editing: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Post", postSchema);
