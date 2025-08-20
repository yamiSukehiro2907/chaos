require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require('bcrypt')

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const newUser = await User.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      email: newUser.email,
    });
  } else {
    throw new Error("User data is not valid!");
  }
};
module.exports = signUpUser;
