const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    console.log("user register :: ", req.body);

    let username = req.body.username
    let phone = req.body.phone
    let existingUser = await User.findOne({ $or: [{ email: username }, { phone: phone }] });

    // if user exist
    if (existingUser) {
        return res.json({
            success: false,
            message: 'User already exist !',
        });
    }

    // if user not exist
    bcrypt.hash(req.body.password, 10, (err, hashedpass) => {

        let user = new User({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedpass
        })

        // save new user
        user.save()
            .then(user => {
                res.json({
                    success: true,
                    message: 'User Register Succesfully!',
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Something went wrong. Please contact technical team !',
                });
            })
    });
}

const login = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    console.log("login user :: ", email, password);

    const user = await User.findOne({ email: email }).lean();

    if (user) {
        const valid = bcrypt.compareSync(password, user.password);
        delete user.password;
        // delete user.email;

        if (valid) {
            const token = jwt.sign(user, 'secret', { expiresIn: '1hr' })
            return res.json({
                success: true,
                message: 'login Succesfull',
                token
            });
        } else {
            return res.json({
                success: false,
                message: ' Password not valid'
            });
        }
    }


    return res.json({
        success: false,
        message: 'No user found. Please signup !'
    });
}

module.exports = {
    register,
    login
}