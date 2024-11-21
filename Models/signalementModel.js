const mongoose = require("mongoose");
const User = require("../Models/userModel");

const signalementSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please provide a title "],
    maxlength: [
      100,
      "A title Validator must have less or equal then 40 characters",
    ],
  },
  type: {
    type: String,
    required: [true, "Please provide a type for this signalement"],
    enum: [
      "Problème de chaufferie",
      "Problème d'électricité",
      "Problème d'hygiène",
      "Problème de sécurité",
      "Objet volé",
      "Objet perdu",
      "Matériel defaillant",
      "Dégâts de mobilier",
      "Animaux errants",
      "Fuite d'eau",
      "Problème de gaz",
      "Coupure d'eau",
      "autre",
    ],
  },
  description: {
    type: String,
    required: [true, "Please provide a description "],
  },

  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

signalementSchema.post("save", async function (signalement, next) {
  await User.addSignalement(signalement.userID, signalement._id);
  next();
});
signalementSchema.post("findOneAndDelete", async function (signalement, next) {
  await User.removeSignalement(signalement.userID, signalement._id);
  next();
});

const Signalement = new mongoose.model("Signalement", signalementSchema);

module.exports = Signalement;
