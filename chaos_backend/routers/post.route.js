const express = require("express");
const {getAllPosts, createPost, likePost} = require("../controllers/post.controller");
const router = express.Router();
const validateToken = require("../middleware/token.validation")
const {upload} = require("../middleware/multer");


router.get("/", validateToken , getAllPosts);

router.post("/create", validateToken, upload.single("media"), createPost);

router.post("/like/:id" , validateToken , likePost)

module.exports = router;