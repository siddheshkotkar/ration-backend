const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Organization=require('../models/organization');
const jwt = require('jsonwebtoken');
const md5=require('md5')

require("dotenv/config");

const app = express(); 
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
const router = express.Router();


router.post("/login",async(req,res)=>{
    const userexits = await Organization.findOne({
        email: req.body.email,
        password: md5(req.body.password),
    });
    try{
    
    if (!userexits){
        
        return res.status(400).send("organization is not registered");
    }else{
        
    const token = await jwt.sign({ id: Organization._id }, process.env.TOKEN_SECRET,{

        expiresIn:process.env.JWT_EXPIRE,

    });

    res.send({token});
    res.status(200);	
}

    }catch (err){
            console.log(err);
    }

})

//===========User Register==============================
router.post("/register",async(req,res)=>{
   
		const emailExists = await Organization.findOne({ email:req.body.email });
		if (emailExists) return res.status(400).send(" user  already exist");


        
		const newOrganization = new Organization({
           org_username:req.body.org_username,
           password:md5(req.body.org_password),
           name:req.body.name,
           place:req.body.place,
           email:req.body.email,
		});

		try {
			const newRegister = await newOrganization.save();
			res.json(newRegister);
		} catch (err) {
			console.log(err);
		}


})

module.exports = router;