const mongoose = require("mongoose");

const logsschema = new mongoose.Schema(
  {
    userID: { type: String },
    logs: [{ category: { type: String }, log: { type: String } }],
  },
  { timestamps: true }
);

const Logs = new mongoose.model("Logs", logsschema);

module.exports = Logs;
