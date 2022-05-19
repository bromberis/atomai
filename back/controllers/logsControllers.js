const Logs = require("./../models/logsModel");

exports.createNewLog = async (req, res) => {
  try {
    const newLog = await Logs.findOneAndUpdate(
      { userID: req.params.id },
      {
        $push: { actions: req.body },
      }
    );
    res.status(200).json({
      status: "success",
      result: newLog,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.registerNewUser = async (req, res) => {
  console.log(req.params);
  try {
    const newUser = await Logs.create({ userID: req.params.id });
    res.status(200).json({
      status: "success",
      result: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
