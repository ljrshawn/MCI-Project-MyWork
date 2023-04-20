const express = require("express");

const authController = require("../controllers/authController");
const recordsController = require("../controllers/recordsController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, recordsController.addNewRecords)
  .get(authController.protect, recordsController.getUserRecords);

module.exports = router;
