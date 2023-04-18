const express = require("express");

const authController = require("../controllers/authController");
const recordsController = require("../controllers/recordsController");

const router = express.Router();

router.post("/", authController.protect, recordsController.addNewRecords);
router.get("/", authController.protect, recordsController.getUserRecords);

module.exports = router;
