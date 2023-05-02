const express = require("express");

const authController = require("../controllers/authController");
const recordsController = require("../controllers/recordsController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, recordsController.getStuHomeRecords);

router
  .route("/team")
  .get(authController.protect, recordsController.getStuTeamHomeRecords);

router
  .route("/:id")
  .get(authController.protect, recordsController.getStuMemRecords);

router
  .route("/teamDetail/:team")
  .get(authController.protect, recordsController.getTeamRecords);

module.exports = router;
