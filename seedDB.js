const mongoose = require("mongoose");
const Post = require("./models/Post.model");

const dummy = [
  { author: "dhanush", body: "First time React app", editing: false },
  { author: "dummy", body: "LIGAM", editing: false },
  { author: "XHU", body: "Bye", editing: false }
];

const seedDB = async () => {
  await Post.remove({});
  await Post.insertMany(dummy);
};

module.exports = seedDB;
