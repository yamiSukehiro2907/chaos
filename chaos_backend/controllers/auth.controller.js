require("dotenv").config();
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { genAccessToken, genRefreshToken } = require("../config/token");

const signUpUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  // validating user inputs
  if (!username || !email || !password || !name) {
    return res
      .status(400)
      .send({ message: "Username and password is required" });
  }

  // Validating existing user with same email
  if (await User.findOne({ email })) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Validating existing user with same username
  if (await User.findOne({ username })) {
    return res.status(400).json({ message: "Username already exists" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password is too short" });
  }

  const salt = await bcrypt.genSalt(10);

  const newUser = await User.create({
    username: username,
    email: email,
    password: await bcrypt.hash(password, salt),
    name: name,
  });

  console.log(salt);

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      email: newUser.email,
      name: newUser.name
    });
  } else {
    throw new Error("User data is not valid!");
  }
};

function isEmailValid(email) {
  return email.toLowerCase().includes("@");
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = await genAccessToken(user.id);

    const refreshToken = await genRefreshToken(user.id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    let userId;
    if (refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (decoded) {
            userId = decoded.id;
          }
        }
      );
    } else if (accessToken) {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
          if (decoded) {
            userId = decoded.id;
          }
        }
      );
    }
    if (userId) {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(200).json({ message: "Logout successful" });
      }
      if (user.refreshToken === "") {
        return res.status(409).json({ error: "User already logged out!" });
      }
      user.refreshToken = "";
      await user.save();
    }
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signUpUser, loginUser, logoutUser };
