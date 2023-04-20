const express = require("express");

const authController = require("../controllers/authController");
const recordsController = require("../controllers/recordsController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, recordsController.getUserHomeRecords);

module.exports = router;
