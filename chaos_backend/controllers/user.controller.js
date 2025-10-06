const User = require("../models/user.model");
const { uploadCloudinary } = require("../config/cloudinary.config.js");

const profile = async (req, res) => {
  try {
    const id = req.id;
    let user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const user = await User.findOne({ username: username }).select(
      "-password -refreshToken"
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editProfile = async (req, res) => {
  try {
    const id = req.id;
    const currentUser = await User.findById(id);
    const { username, name, bio } = req.body;
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username && currentUser.username !== username) {
      const userWithSameUsername = await User.findOne({ username: username });
      if (userWithSameUsername) {
        return res.status(400).json({ message: "Username is already in use" });
      }
      currentUser.username = username;
    }

    if (name && currentUser.name !== name) {
      currentUser.name = name;
    }

    if (bio && currentUser.bio !== bio) {
      currentUser.bio = bio;
    }

    if (req.file) {
      try {
        currentUser.profilePicture = await uploadCloudinary(req.file.path);
      } catch (uploadError) {
        return res.status(500).json({
          message: "Failed to upload image",
          error: uploadError.message,
        });
      }
    }

    const updatedUser = await currentUser.save();
    return res.status(201).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProfileByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ message: "Id params missing" });
    }

    const user = await User.findById(id).select("-password -refreshToken");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { profile, editProfile, getProfile, getProfileByUserId };
