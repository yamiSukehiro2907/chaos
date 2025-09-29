const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/token.validation")
const {profile, editProfile, getProfile , getProfileByUserId} = require("../controllers/user.controller.js");
const {upload} = require("../middleware/multer.js");


router.get("/profile", validateToken, profile);

router.get('/profile/:username', getProfile);

router.put("/editProfile", validateToken, upload.single("profilePic"), editProfile)

router.get("/:id" , getProfileByUserId)

module.exports = router;