const express = require("express");
const validateToken = require("../middleware/token.validation");
const {
  followUser,
  unFollowUser,
} = require("../controllers/follow.controller");
const router = express.Router();

router.post("/follow/:id", validateToken, followUser);

router.post("/unfollow/:id", validateToken, unFollowUser);

module.exports = router;
