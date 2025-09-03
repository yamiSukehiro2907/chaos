const User = require("../models/userModel");

const profile = async (req, res) => {
    try {
        const id = req.id;
        let user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = profile