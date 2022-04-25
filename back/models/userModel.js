const mongoose = require("mongoose");

const IncomeSchema = mongoose.Schema(
  {
    date: { type: Date },
    sum: { type: Number, required: true },
    name: { type: String },
    category: { type: String },
    type: { type: String, default: "income" },
    addDate: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const ExpensesSchema = mongoose.Schema(
  {
    date: { type: Date },
    sum: { type: Number, required: true },
    name: { type: String },
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
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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

// Duomenų siuntimas į DB
// const testUsers = new Users({
//   name: "Atomas Gediminas",
//   email: "antanas@gmail.com",
//   password: "123",
//   balance: 0,
//   limit: [{ category: "transport", limit: 200 }],
//   income: [
//     {
//       date: "2022-04-10",
//       sum: "1500",
//       name: "alga",
//       category: "alga",
//     },
//     {
//       date: "2022-04-05",
//       sum: "2000",
//       name: "alga",
//       category: "alga",
//     },
//   ],
//   expenses: [
//     {
//       date: "2022-04-14",
//       sum: "100",
//       name: "pica",
//       category: "pramogos",
//     },
//     {
//       date: "2022-04-03",
//       sum: "50",
//       name: "mokesčiai",
//       category: "pramogos",
//     },
//     {
//       date: "2022-04-03",
//       sum: "50",
//       name: "mokesčiai",
//       category: "pramogos",
//     },
//   ],
// });

// testUsers.save();

module.exports = Users;
