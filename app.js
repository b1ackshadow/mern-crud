const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const seedDB = require("./seedDB");
const handleError = require("./handlers/errorHandlers");
const postRoutes = require("./routes/post.routes");
// handleError(seedDB());

app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// allow-cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  console.log(h + ":" + m + ":" + s);

  if (h === 0 && m === 0) eraseDB();
  next();
});

app.use("/", postRoutes);

module.exports = app;
