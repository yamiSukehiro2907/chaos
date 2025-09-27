const mongoose = require('mongoose');
import User from "./user.model.js"

const postSchema = mongoose.Schema(
    {
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
        }
        ,
        caption: {
            type: String,
            default: '',
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            }
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
                created_at: {
                    type: Date,
                    default: Date.now(),
                }

            }
        ]
    }, {timestamps: true}
)

module.exports = mongoose.model("post", postSchema);