const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;

const organizationSchema = new mongoose.Schema({
  org_username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Oraganization", organizationSchema);
