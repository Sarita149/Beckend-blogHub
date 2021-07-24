const jwt = require('jsonwebtoken');
 

const jwtAuth = (req,res,next)=>{
    let authToken = req.headers.authorization;
    console.log("kjsdbf",authToken);
    jwt.verify(authToken, 'secret',(err,decode)=>{
        if(decode){
            req.decodedToken = decode;
            next();
        }else {
            return res.json({
                message : 'Token is invalid or expired!',
            })
        }  

    });
    // console.log("jwtAuth : ", req.headers.authorization);
}

// author ka role kiya ok to if else me dono user type dene h

module.exports = jwtAuth;