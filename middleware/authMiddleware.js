const jwt = require('jsonwebtoken');
const User = require('../models/User');


const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'Jashanks Secret', (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}
const checkUser =   (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'Jashanks Secret', async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                next();
            }
            else{
                console.log(decodedToken);
                res.locals.user = await User.findById(decodedToken.id);
                next();
            }
        })
    }
    else{
        // res.redirect('/login');
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth,checkUser};