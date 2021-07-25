const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    categoryName: { type: String },
    catImage: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("category", categorySchema, 'Categories');