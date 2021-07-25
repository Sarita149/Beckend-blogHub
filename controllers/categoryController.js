const category = require('../models/Category');


const getCategory = async(req, res) => {
    let list = await category.find().select('categoryName catImage').lean()

    if (list) {
        return res.json({
            message: 'Fetch Success.',
            success: true,
            data: list
        });
    } else {
        return res.json({
            message: 'Something went wrong !.',
            success: false,
        });
    }
}


const getCategoryWithoutImage = async(req, res) => {
    let list = await category.find().select('categoryName').lean()

    if (list) {
        return res.json({
            message: 'Fetch Success.',
            success: true,
            data: list
        });
    } else {
        return res.json({
            message: 'Something went wrong !.',
            success: false,
        });
    }

}


const addCategory = async(req, res) => {

    let catObj = { categoryName: req.body.categoryName, catImage: req.body.catImage };
    cat = await new category(catObj).save();

    if (cat) {
        return res.json({
            message: 'Category added Succesfully.',
            success: true,
        });
    } else {
        return res.json({
            message: 'Something went wrong !.',
            success: false,
        });
    }

}


module.exports = { getCategory, addCategory, getCategoryWithoutImage };