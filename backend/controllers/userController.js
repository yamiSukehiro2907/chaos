require("dotenv").config();
const User = require("../models/userModel");

const signUpUser = async (req, res) => {
    res.send("API Hit")
};
module.exports = signUpUser;
