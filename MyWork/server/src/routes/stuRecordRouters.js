const express = require("express");

const authController = require("../controllers/authController");
const recordsController = require("../controllers/recordsController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, recordsController.getUserHomeRecords);

router
  .route("/team")
  .get(authController.protect, recordsController.getUserTeamHomeRecords);

module.exports = router;
