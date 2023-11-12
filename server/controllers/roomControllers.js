const Room = require("../model/roomModel");

exports.getRoom = async (req, res) => {
    const query = { roomId: req.params.roomId }
    
  try {
    const room = await Room.findOne(query);
    if(room)
      res.status(200).json(room);
    else
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
}

exports.addRoom = async (req, res) => {
    const query = { roomId: req.params.roomId };
    try {
        const newRoom = await Room.create(query);
        res.status(201).json({
          status: "success",
        });
      } catch (err) {
        res.status(400).json({
          status: "Fail",
        });
      }
}