const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please provide a title "],
    maxlength: [
      40,
      "A title Validator must have less or equal then 40 characters",
    ],
  },
  description: {
    type: String,
    required: [true, "Please provide a description "],
  },
  state: {
    type: String,
    required: [true, "Please provide a type for this signalement"],
    enum: ["state1", "state2", "state3"],
  },
  date: Date,
});

const Annonce = new mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;
