const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please complete all the fields"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is requied"],
    },
  },
  {
    timestampes,
  }
);

module.exports = mongoose.model("users", userSchema);
