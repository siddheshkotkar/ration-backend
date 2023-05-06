const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;


const slotsSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  rations: [{ ration: { type: mongoose.Schema.Types.ObjectId, ref: "Ration" } }],
  limit: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Slots", slotsSchema);
