const mongoose = require('mongoose');


const BlogSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    timage: { type: String },
    publish: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    views: {
        type: Number,
        default: 0
    },
    shortDescription: {
        type: String,
    }

}, { timestamps: true })

module.exports = mongoose.model("Blog", BlogSchema, 'Blogs');