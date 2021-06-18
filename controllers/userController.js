const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    let username = req.body.username
    let phone = req.body.phone
    User.findOne({ $or: [{ email: username }, { phone: phone }]}, (err, user) => {
        if (err) {
            res.json(err);
        } else if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
                // console.log(hashedpass);
                if (err) {
                    res.json({
                        error: err
                    })
                }
                let user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hashedpass
                })
                // console.log(user.name);
                user.save()
                .then(user => {
                    res.json({
                        message: 'User Register Succesfully!',
                        result: user
                    })
                })
                .catch(err => {
                    res.json(err)
                })

            })
        } else {
            res.json({
                message: "User already exist"
            });
        }
    })
}

const login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // let phone = req.body.phone;
    console.log(req.body);
    User.findOne({ email: email }, (err, user) => {
        console.log(user);
        console.log("error"+err);
        if (err) {
           return res.json(err);
        } else if (user) {
            console.log(user);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                   return res.json({
                        message: 'error',
                        error: err
                    })
                }
                if (result) {
                    let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1hr' })
                    console.log("token"+token);
                    return res.json({
                        message: 'Login Successfully',
                        token
                    })
                } else {
                   return res.json({
                        message: 'password does not matched!'
                    })
                }
            })

        } else {
           return res.json({
                message: 'No user found!'
            })
        }
    })
}

module.exports = {
    register, login
}