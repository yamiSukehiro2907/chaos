const User = require("../models/user.model.js");

const followUser = async (req, res) => {
  try {
    const userId = req.id;
    const toFollowId = req.params.id;

    if (userId.toString() === toFollowId.toString()) {
      return res
        .status(409)
        .json({ message: "Following yourself is not allowed" });
    }

    const toFollowUser = await User.findById(toFollowId);
    if (!toFollowUser) {
      return res
        .status(400)
        .json({ message: "To Follow User does not exists" });
    }

    const user = await User.findById(userId);

    const alreadyFollowing = user.following.some(
      (id) => id.toString() === toFollowId.toString()
    );

    if (!alreadyFollowing) {
      user.following.push(toFollowId);
      toFollowUser.followers.push(userId);
      await user.save();
      await user.populate("following", "name username profilePicture");
      await toFollowUser.save();
      await toFollowUser.populate("followers", "name username profilePicture");
    } else {
      return res.status(409).json({ message: "You are already following" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const unFollowUser = async (req, res) => {
  try {
    const userId = req.id;
    const toUnFollowId = req.params.id;

    if (userId.toString() === toUnFollowId.toString()) {
      return res
        .status(409)
        .json({ message: "Following yourself is not allowed" });
    }
    const toUnFollowUser = await User.findById(toUnFollowId);
    if (!toUnFollowUser) {
      return res
        .status(400)
        .json({ message: "To Follow User does not exists" });
    }

    const user = await User.findById(userId);

    const Following = user.following.some(
      (id) => id.toString() === toUnFollowId.toString()
    );

    if (Following) {
      user.following = user.following.filter(
        (id) => id.toString() !== toUnFollowId.toString()
      );
      toUnFollowUser.followers = toUnFollowUser.followers.filter(
        (id) => id.toString() !== userId.toString()
      );
      await user.save();
      await toUnFollowUser.save();
    } else {
      return res
        .status(409)
        .json({ message: "You are not following the User" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { followUser, unFollowUser };
