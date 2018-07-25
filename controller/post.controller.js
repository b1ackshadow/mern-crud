const mongoose = require("mongoose");
const Post = require("../models/Post.model");
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
};

exports.newPost = async (req, res) => {
  const post = await new Post({
    author: req.body.author,
    body: req.body.body
  });
  post.save();
  if (post) {
    return res.json(post);
  }
};
exports.getPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.json(post);
};
exports.updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  });
  if (!post) {
    return res.redirect("back");
  }
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const deletedPost = await Post.findOneAndRemove({ _id: req.params.id });
  res.json(deletedPost._id);
};
