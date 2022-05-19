const mongoose = require("mongoose");

const logs = mongoose.Schema(
  {
    userID: { type: String },
    actions: [],
  },
  { timestamps: true }
);

const Logs = new mongoose.model("Logs", logs);

module.exports = Logs;
