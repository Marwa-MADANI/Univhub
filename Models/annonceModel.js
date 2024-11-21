const mongoose = require("mongoose");
const User = require("../Models/userModel");

const annonceSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please provide a title "],
    maxlength: [
      100,
      "A title Validator must have less or equal then 40 characters",
    ],
  },
  description: {
    type: String,
    required: [true, "Please provide a description "],
  },
  type: {
    type: String,
    required: [true, "Please provide a type for this annonce"],
    enum: ["Évènement", "Administratif"],
  },
  date: Date,

  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
});

annonceSchema.post("save", async function (annonce, next) {
  await User.addAnnonce(annonce.userID, annonce._id);
  next();
});
annonceSchema.post("findOneAndDelete", async function (annonce, next) {
  await User.removeAnnonce(annonce.userID, annonce._id);
  next();
});

const Annonce = new mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;
