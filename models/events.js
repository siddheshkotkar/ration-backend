const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;


const eventSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Oraganization",
  },
  name: {
    type: String,
    required: true,
  }
  ,
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
