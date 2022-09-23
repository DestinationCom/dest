const jwt = require("jsonwebtoken");
const express = require("express");

const app = express();
const User = require("./model/userSchema");

const router = require("./router/auth");
const cookieParser = require("cookie-parser");
app.use(cookieParser());


const Authenticate = async(req, res, next)=>{
    try{
        console.log("inside try")
    const token = req.cookies.mernjwt;
    console.log("tokenBody",token);
    const verifyToken = jwt.verify(token, process.env.SECRETE_KEY);

    const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});

    if (!rootUser){
        throw new Error('User not found');
    }
    req.token=token;
    req.rootUser=rootUser;
    req.userID = rootUser._id;

    next();

    } catch(err){
        res.status(401).send('Unauthorized: no token provided')
        console.log(err)
    }
}

module.exports=Authenticate;