const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Post = require("./Post.model");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const dummy = [
  { author: "dhanush", body: "First time React app" },
  { author: "dummy", body: "LIGAM" },
  { author: "XHU", body: "Bye" }
];

const seedDB = async dummy => {
  await Post.remove({});
  const result = await Post.insertMany(dummy);
  if (result) console.log("seeding db successful");
  else console.log("Sedding db failed");
};
// seedDB(dummy);

mongoose.connect(
  "mongodb://localhost:27017/mern",
  { useNewUrlParser: true }
);

const handleError = fn => (...params) =>
  fn(...params).catch(error => console.log(error));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// allow-cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.get(
  "/",
  handleError(async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
  })
);

app.post(
  "/post",
  handleError(async (req, res) => {
    const post = await new Post({
      author: req.body.author,
      body: req.body.body
    });
    post.save();
    res.redirect("/");
  })
);

app.get(
  "/post/:id",
  handleError(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.json(post);
  })
);

app.put(
  "/post/:id",
  handleError(async (req, res) => {
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    if (!post) {
      console.log(post);
      return res.redirect("back");
    }
    res.json(post);
  })
);

app.delete(
  "/post/:id",
  handleError(async (req, res) => {
    await Post.findOneAndRemove({ _id: req.params.id });
    res.redirect("/");
  })
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
