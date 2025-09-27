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
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },

    refreshToken: {
      type: String,
      default: "",
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
      },
    ],
    reels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reel",
        required: true,
      },
    ],
    story: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "story",
        required: true,
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reply",
        required: true,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        enum: ["post", "story", "reel"],
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
