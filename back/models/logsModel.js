const mongoose = require("mongoose");

const logsschema = new mongoose.Schema({
  category: { type: String },
  userID: { type: String },
  action: { type: String },
  time: { type: Date },
  sum: { type: Number },
  name: { type: String },
  email: { type: String },
});

const Logs = new mongoose.model("Logs", logsschema);

module.exports = Logs;
