
const jwt =require('jsonwebtoken');
require('dotenv/config');
const Organization=require("../models/organization")
const User=require("../models/user")


//=========================User JWT verify=================================
const userverify=async(req,res,next)=>{
    try{

        const {authtoken}= req.headers;
        if(!authtoken){
            return next("Please enter the login access data");
        }const verify= await jwt.verify(authtoken,process.env.TOKEN_SECRET);
        req.user =await User.findById(verify.id);
        next();
    
    
       }catch(err){
        return next(err);
    
       }
    
};
//=======================Organization JWT verify=============================
const orgverify=async(req,res,next)=>{

    try{

        const {authtoken}= req.headers;
        if(!authtoken){
            return next("Please enter the login access data");
        }const verify= await jwt.verify(authtoken,process.env.TOKEN_SECRET);
        req.user =await Organization.findById(verify.id);
        next();
    
    
       }catch(err){
        return next(err);
    
       }

}

module.exports={userverify,orgverify};

