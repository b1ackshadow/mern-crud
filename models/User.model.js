const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
require("mongoose-type-email");

const userSchema = new Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    lowercase: true,
    trim: true,
    required: "Please Supply an email address"
  },
  name: {
    type: String,
    required: "Please supply a name",
    trim: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  posts: [{ type: mongoose.Schema.ObjectId, ref: "Post" }]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
