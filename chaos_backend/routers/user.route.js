const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/token.validation")
const {profile , editProfile} = require("../controllers/user.controller.js");

router.get("/profile", validateToken, profile);

router.post("/editProfile" , validateToken , editProfile)

module.exports = router;