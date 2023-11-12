const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  roomId: {
    type: String,
    required: [true, "Please provide a roomId"],
    unique: true,
  },

});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;