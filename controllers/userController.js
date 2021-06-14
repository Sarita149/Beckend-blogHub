const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password,10,(err,hashedpass)=>{
        // console.log(hashedpass);
        if(err){
            res.json({
                error : err
            })
        }
        let user = new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedpass
        })
        // console.log(user.name);
        user.save()
        .then(user => {
            res.json({
                message : 'User Register Succesfully!',
                result : user
            })
        })
        .catch(err =>{
            res.json(err)
        })

    })
}

const login = (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    User.findOne({$or:[{email:username},{phone:username}]})
    .then(user => {
        console.log(user);
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.json({
                        error:err
                    })
                }
                if( result ){
                    let token = jwt.sign({name:user.name},'verySecretValue',{expiresIn:'1hr'})
                    console.log("token"+token);
                    res.json({
                        message : 'Login Successfully',
                        token
                    })
                }else{
                    res.json({
                        message:'password does not matched!'
                    })
                }
            })
        }else{
            res.json({
                message:'No user found!'
            })
        }
    })
    
}

module.exports = {
    register,login
}