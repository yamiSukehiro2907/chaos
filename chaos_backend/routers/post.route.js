const express = require("express");
const {getAllPosts, createPost} = require("../controllers/post.controller");
const router = express.Router();
const validateToken = require("../middleware/token.validation")
const {upload} = require("../middleware/multer");


router.get("/", getAllPosts);

router.post("/create", validateToken, upload.single("media"), createPost);

module.exports = router;