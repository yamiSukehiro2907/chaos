const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/token.validation")
const profile = require("../controllers/user.controller.js");

router.get("/profile", validateToken, profile);

module.exports = router;