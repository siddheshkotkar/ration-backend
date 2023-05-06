const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  slot:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slots",
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  }
});

module.exports = mongoose.model("Bookedslots", eventSchema);
