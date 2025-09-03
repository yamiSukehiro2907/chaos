const jwt = require("jsonwebtoken");
require("dotenv").config();
const genToken = async (id, type, expireIn) => {
    try {
        return jwt.sign({id, type: type}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expireIn});
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = genToken;