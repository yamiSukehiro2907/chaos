const express = require("express");
const Story = require("../models/story.model.js");
const User = require("../models/user.model.js");
const {uploadCloudinary} = require("../config/cloudinary.config");

const getAllStory = async (req, res) => {
    try {
        const stories = await Story.find({}).sort({createdAt: -1});
        return res.status(200).json(stories);

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}


const createStory = async (req, res) => {
    try {
        const id = req.id;
        const user = User.findById(id);

        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        const {mediaType} = req.body;
        if (!mediaType || !req.file) {
            return res.status(400).json({message: "Invalid story contents"});
        }

        const mediaUrl = await uploadCloudinary(req.file.path)
        const story = await Story.create({
            author: user,
            mediaType: mediaType,
            mediaUrl: mediaUrl,
        })

        return res.status(200).json(story);
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {getAllStory, createStory};