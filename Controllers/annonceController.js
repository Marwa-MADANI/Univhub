const Annonce = require("../Models/annonceModel");
const factory = require("./handlerFactory");

exports.createAnnonce = factory.createOne(Annonce, []);

exports.getAnnonce = factory.getOne(Annonce, []);

exports.getAnnonces = factory.getAll(Annonce, {}, []);

exports.updateAnnonce = factory.updateOne(Annonce, []);

exports.deleteAnnonce = factory.deleteOne(Annonce);
