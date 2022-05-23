const mongoose = require("mongoose");

const logsschema = new mongoose.Schema({
  category: { type: String },
  userID: { type: String },
  action: { type: String },
  time: { type: Date },
});

const Logs = new mongoose.model("Logs", logsschema);

module.exports = Logs;
