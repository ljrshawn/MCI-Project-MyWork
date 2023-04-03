const express = require("express");

const manageController = require("../controllers/manageController");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");

const router = express.Router();

router.post("/", authController.protect, manageController.createStudent);
router.post("/import", authController.protect, manageController.importStudent);
router.get("/", authController.protect, manageController.getAllStudents);
router.delete("/:id", authController.protect, manageController.deleteUser);
router.get("/:id", authController.protect, manageController.getStudents);
router.patch(
  "/:id",
  authController.protect,
  manageController.updateStudents,
  teamController.addTeams
);

module.exports = router;
