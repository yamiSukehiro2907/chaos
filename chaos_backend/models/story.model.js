const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },
    mediaUrl: {
        type: String,
        required: true,
    },
    viewers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 24 * 60 * 60 * 1000
    }
})

module.exports = mongoose.model('story', storySchema);