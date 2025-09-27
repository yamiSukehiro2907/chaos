import mongoose from "mongoose";

const reelSchema = mongoose.Schema({
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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }],
    shares: {
        type: Number,
        default: 0,
    },
    caption: {
        type: String,
        default: '',
    }
    ,
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    }]
    ,
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("reel", reelSchema);