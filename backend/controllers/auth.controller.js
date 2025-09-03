require("dotenv").config();
const User = require("../models/userModel.js");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const genToken = require("../config/token");

const signUpUser = async (req, res) => {
    const {username, email, password} = req.body;

    // validating user inputs
    if (!username || !email || !password) {
        return res.status(400).send({message: 'Username and password is required'});
    }

    // Validating existing user with same email
    if (await User.findOne({email})) {
        return res.status(400).json({error: "Email already exists"});
    }

    // Validating existing user with same username
    if (await User.findOne({username})) {
        return res.status(400).json({message: "Username already exists"});
    }

    if (password.length < 6) {
        return res.status(400).json({message: "Password is too short"});
    }

    const salt = await bcrypt.genSalt(10);

    const newUser = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, salt),
    });

    console.log(salt)

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            email: newUser.email,
        });
    } else {
        throw new Error("User data is not valid!");
    }
};

function isEmailValid(email) {
    return email.toLowerCase().includes('@');
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;

    // Input validation
    if (!username || !password) {
        return res.status(400).json({error: "All fields are required"});
    }

    try {
        // Find user
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({error: "Invalid credentials"});
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({error: "Invalid credentials"});
        }

        const accessToken = await genToken(user.id, "access", "15m");

        const refreshToken = await genToken(user.id, "refresh", "7d");

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: true,
            maxAge: 15 * 60 * 1000
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({error: "Internal Server Error"});
    }
};


module.exports = {signUpUser, loginUser};
