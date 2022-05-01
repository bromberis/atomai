const mongoose = require("mongoose");

const IncomeSchema = mongoose.Schema(
  {
    date: { type: Date },
    sum: { type: Number, required: true },
    name: { type: String, trim: true, maxLength: 30 },
    category: { type: String },
    type: { type: String, default: "income" },
  },
  { timestamps: true }
);

const ExpensesSchema = mongoose.Schema(
  {
    date: { type: Date },
    sum: { type: Number, required: true },
    name: { type: String, trim: true, maxLength: 30 },
    category: { type: String },
    type: { type: String, default: "expenses" },
  },
  { timestamps: true }
);

const LimitSchema = mongoose.Schema(
  {
    limit: { type: Number },
    category: { type: String },
  },
  { timestamps: true }
);

// MAIN DB schema
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 12,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      // maxlength:
    },
    balance: {
      type: Number,
    },

    limit: [LimitSchema],
    income: [IncomeSchema],
    expenses: [ExpensesSchema],
  },
  { timestamps: true }
);

// Modelis DB lentelės pavadinimas
const Users = new mongoose.model("Users", usersSchema);

// testUsers.save();

module.exports = Users;
