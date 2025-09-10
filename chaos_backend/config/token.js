const jwt = require("jsonwebtoken");
require("dotenv").config();
const genAccessToken = async (id) => {
    try {
        return jwt.sign({id, type: "access"}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION});
    } catch (error) {
        throw new Error(error);
    }
}

const genRefreshToken = async (id) => {
    try {
        return jwt.sign({id, type: "refresh"}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION});
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {genAccessToken , genRefreshToken};