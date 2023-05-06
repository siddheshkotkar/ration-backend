const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express(); 
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

mongoose.connect(
	process.env.DB_Connect,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
).then(()=>{
    console.log("DB done")
})
const { userverify, orgverify } = require("./routes/jwtverify");


const userAuth=require("./routes/user_auth");
const orgAuth=require("./routes/org_auth");
const userRoutes = require("./routes/user");
const orgRoutes = require("./routes/organization");


app.use("/userAuth", userAuth);
app.use("/orgAuth", orgAuth);

app.use("/user",userverify, userRoutes);
app.use("/organization",orgverify,orgRoutes);


//console.log("Done ")

app.listen(3000,(req,res)=>{
    console.log("Connected")
})

