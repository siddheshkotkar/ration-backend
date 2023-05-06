const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User= require("../models/user")
const jwt = require('jsonwebtoken');
const md5=require('md5')

require("dotenv/config");

const app = express(); 
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
const router = express.Router();

//============User Login==============================
router.post("/login",async(req,res)=>{
    const userexits = await User.findOne({
        phone: req.body.phone,
        password: md5(req.body.password),
    });
    try{
    
    if (!userexits){
        
        return res.status(400).send("not-loggedin");
    }else{
        
    const token = await jwt.sign({ id: User._id }, process.env.TOKEN_SECRET,{

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
   
		const phoneExist = await User.findOne({ phone:req.body.phone });
		if (phoneExist) return res.status(400).send(" user  already exist");

        const adharExist = await User.findOne({ adhar_no:req.body.adhar });
		if (adharExist) return res.status(400).send(" user  already exist");

        const rationExist = await User.findOne({ ration_no:req.body.ration });
		if (rationExist) return res.status(400).send(" user  already exist");


		const newuser = new User({
            first_name:req.body.fname,
            last_name:req.body.lname,
            adhar_no:req.body.adhar,
            ration_no:req.body.ration,
            phone:req.body.phone,
			password: md5(req.body.password)
		});

		try {
			const newRegister = await newuser.save();
			res.json(newRegister);
		} catch (err) {
			return res.status(400).json({error: err.message})
		}


})

module.exports = router;