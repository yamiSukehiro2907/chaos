const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({message: "No token provided"});
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({message: "Authentication failed"});
        }
        req.id = decoded.id;
        next();
    })
}

module.exports = validateToken;