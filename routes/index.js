const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const handleError = require("../handlers/errorHandlers");
const postController = require("../controller/post.controller");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
router.get("/", handleError(postController.getAllPosts));

router.post("/post", handleError(postController.newPost));

router.get("/post/:id", handleError(postController.getPost));

router.put("/post/:id", handleError(postController.updatePost));

router.delete("/post/:id", handleError(postController.deletePost));

//auth routes
router.post(
  "/register",
  handleError(userController.register, authController.login)
);
router.get("/logout", authController.logout);

module.exports = router;
