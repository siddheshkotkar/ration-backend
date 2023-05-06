const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;


const rationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  manufacturing_date: {
    type: Date,
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Oraganization",
  },
});

module.exports = mongoose.model("Ration", rationSchema);
