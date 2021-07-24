const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('./authController');

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
    // console.log(req.body);
    const user = User.findOne({ email: email }).lean()
    console.log(user);
    user.then(
        (result)=>{
            console.log(result);
            const valid = bcrypt.compareSync( password , result.password);
            delete result.password;
            delete result.email;
            console.log("valid  : "+valid);
            if(valid){
                const token = jwt.sign(result,'secret',{expiresIn:'1hr'})
                return res.json({
                    message:'login Succesfully',
                    token
                })
            }else{
                return res.json({
                    message : ' Password not valid'
                })
            }
        }
    ).catch(
        (err)=>{
            return res.json({
                message:'user not found',
                error : err
            })
        }
    )
}

module.exports = {
    register, login
}