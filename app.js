const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const seedDB = require("./seedDB");
const handleError = require("./handlers/errorHandlers");
const routes = require("./routes/index");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

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

// // Passport JS for login
app.use(passport.initialize());
app.use(passport.session());

// validator methods package
app.use(expressValidator());

//populates req.cookies with cookies in order to maintain login status
// app.use(cookieParser());
//Request logger
app.use(morgan("dev"));

//maintains session between every request ,allows user to stay logged in

app.use(
  session({
    secret: "mynameajeff",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use("/", routes);

module.exports = app;
