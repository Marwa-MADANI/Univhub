const express = require("express");
const authController = require("../Controllers/authController");
const signalementContoller = require("../Controllers/signalementController");
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(signalementContoller.getSignalements)
  .post(signalementContoller.createSignalement);

router.route("/:title").get(signalementContoller.getSignalement);
router
  .route("/:_id")
  .patch(signalementContoller.updateSignalement)
  .delete(signalementContoller.deleteSignalement);

module.exports = router;
