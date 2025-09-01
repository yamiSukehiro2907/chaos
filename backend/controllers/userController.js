require("dotenv").config();
const User = require("../models/userModel.js");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

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
    if (await User.findOne({email})) {
        return res.status(400).json({message: "Username already exists"});
    }

    if (password.length < 6) {
        return res.status(400).json({message: "Password is too short"});
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

function isEmailValid(email) {
    return email.toLowerCase().includes('@');
}

const loginUser = async (req, res) => {
    const {identifier, password} = req.body;
    if (!identifier || !password) {
        return res.status(400).send({error: "All fields are required"});
    }

    let user;
    if (isEmailValid(identifier)) {
        user = await User.findOne({email: identifier});
    } else {
        user = await User.findOne({username: identifier});
    }

    if (!user) {
        return res.status(400).send({error: "User does not exist"});
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = await jwt.sign(
                {userId: user.id, type: "access"},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "15m"}
            );
            const refreshToken = await jwt.sign(
                {userId: user.id, type: "refresh"},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: "7d"}
            );
            return res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        } else {
            return res.status(401).send({error: "Password is incorrect"});
        }
    } catch (err) {
        console.error(err);
        return res.status(200).send({error: "Internal Server Error"});
    }
}


module.exports = {signUpUser, loginUser};
