const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomControllers");



router
  .post("/:roomId", roomController.addRoom)
  .get("/:roomId", roomController.getRoom);


module.exports = router;