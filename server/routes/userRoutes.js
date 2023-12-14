const express = require("express");
const router = express.Router();
const { signup , login , students } = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/students").get(students);

module.exports = router;