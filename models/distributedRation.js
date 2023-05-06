const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;

const distributedRationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  ration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rations",
  },
  quantity: {
    type: Number,
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Events",
  },
});

module.exports = mongoose.model("DistributedRation", distributedRationSchema);
