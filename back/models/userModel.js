const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
      minLength: 2,
      maxLength: 12,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 100,
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

// testUsers.save();

usersSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 8
  this.password = await bcrypt.hash(this.password, 8);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

usersSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = new mongoose.model("Users", usersSchema);

module.exports = Users;
