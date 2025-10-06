const Post = require("../models/post.model");
const User = require("../models/user.model");
const { uploadCloudinary } = require("../config/cloudinary.config");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name username profilePicture")
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createPost = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { mediaType, caption } = req.body;

    if (!mediaType || !caption) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let mediaUrl;

    if (req.file) {
      try {
        mediaUrl = await uploadCloudinary(req.file.path);
      } catch (uploadError) {
        return res.status(500).json({
          message: "Failed to upload image",
          error: uploadError.message,
        });
      }
    }
    const post = await Post.create({
      author: user,
      mediaType: mediaType,
      caption: caption,
      mediaUrl: mediaUrl,
    });

    const populatedUser = await User.findById(id).populate("posts");

    populatedUser.posts.push(post?._id);

    await populatedUser.save();

    const populatedPost = await Post.findById(post?._id).populate(
      "author",
      "name username profilePicture"
    );

    await populatedPost.save();

    return res.status(201).json({ post });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ message: "PostId is required" });
    }
    const userId = req.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    const alreadyLiked = post.likes.some(
      (id) => userId.toString() == id.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => userId.toString() !== id.toString()
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();
    await post.populate("author", "username profilePicture");

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { getAllPosts, createPost, likePost };
