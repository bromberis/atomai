const Logs = require("../models/logsModel");

exports.createNewLog = async (req, res) => {
  console.log(req.body);

  try {
    const newUser = await Logs.create(req.body);
    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllLogs = async (req, res) => {
  try {
    const allLogs = await Logs.find();
    res.status(200).json({
      status: "sucess",
      data: allLogs,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
