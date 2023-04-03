const express = require("express");

const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");

const router = express.Router();

router.get("/", authController.protect, teamController.getAllTeams);

module.exports = router;
