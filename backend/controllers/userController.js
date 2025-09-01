require("dotenv").config();
const User = require("../models/userModel.js");
const bcrypt = require('bcrypt')

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
module.exports = signUpUser;
