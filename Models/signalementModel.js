const mongoose = require("mongoose");

const signalementSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please provide a title "],
    maxlength: [
      40,
      "A title Validator must have less or equal then 40 characters",
    ],
  },
  type: {
    type: String,
    required: [true, "Please provide a type for this signalement"],
    enum: ["type1", "type2", "type3"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description "],
  },
});

const Signalement = new mongoose.model("Signalement", signalementSchema);

module.exports = Signalement;
