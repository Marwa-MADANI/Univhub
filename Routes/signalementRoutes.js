const express = require("express");
const authController = require("../Controllers/authController");
const signalementContoller = require("../Controllers/signalementController");
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(signalementContoller.getSignalements)
  .post(signalementContoller.createSignalement);

router
  .route("/:_id")
  .get(signalementContoller.getSignalement)
  .patch(signalementContoller.updateSignalement)
  .delete(signalementContoller.deleteSignalement);

module.exports = router;
