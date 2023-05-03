const express = require("express");

const authController = require("../controllers/authController");
const recordsController = require("../controllers/recordsController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, recordsController.addNewRecords)
  .get(authController.protect, recordsController.getUserRecords);

router
  .route("/dateDetail/")
  .get(authController.protect, recordsController.getDateDetail);
router
  .route("/img/")
  .get(authController.protect, recordsController.getRecordsEvidence);

router
  .route("/img/:id")
  .get(authController.protect, recordsController.getRecordsEvidence);

module.exports = router;
