const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, userController.getProfile)
  .post(authController.protect, userController.updateProfile);

module.exports = router;
