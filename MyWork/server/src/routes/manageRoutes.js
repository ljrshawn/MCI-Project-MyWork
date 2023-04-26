const express = require("express");

const manageController = require("../controllers/manageController");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, manageController.createStudent)
  .get(authController.protect, manageController.getAllStudents);

router.post("/import", authController.protect, manageController.importStudent);

router
  .route("/teamNumber")
  .get(authController.protect, teamController.getAllTeamsRecords);

router
  .route("/:id")
  .delete(authController.protect, manageController.deleteUser)
  .get(authController.protect, manageController.getStudents)
  .patch(
    authController.protect,
    manageController.updateStudents,
    teamController.addTeams
  );

module.exports = router;
