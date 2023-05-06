const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;


const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  adhar_no: {
    type: String,
    required: true,
  },

  ration_no: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Users", userSchema);
