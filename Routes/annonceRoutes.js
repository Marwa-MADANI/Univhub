const express = require("express");
const authController = require("../Controllers/authController");
const annonceContoller = require("../Controllers/annonceController");
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(annonceContoller.getAnnonces)
  .post(annonceContoller.createAnnonce);

router.route("/:title").get(annonceContoller.getAnnonce);

router
  .route("/:_id")
  .patch(annonceContoller.updateAnnonce)
  .delete(annonceContoller.deleteAnnonce);

module.exports = router;
