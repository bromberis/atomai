const mongoose = require("mongoose");

const logsschema = new mongoose.Schema({
  category: { type: String },
  userID: { type: String },
  action: { type: String },
  time: { type: String },
  sum: { type: String },
  name: { type: String },
  email: { type: String },
  incexpCategory: { type: String },
});

const Logs = new mongoose.model("Logs", logsschema);

module.exports = Logs;
