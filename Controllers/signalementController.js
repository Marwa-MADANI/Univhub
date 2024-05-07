const Signalement = require("../Models/signalementModel");
const factory = require("./handlerFactory");

exports.createSignalement = factory.createOne(Signalement, []);

exports.getSignalement = factory.getOne(Signalement, []);

exports.getSignalements = factory.getAll(Signalement, {}, []);

exports.updateSignalement = factory.updateOne(Signalement, []);

exports.deleteSignalement = factory.deleteOne(Signalement);
