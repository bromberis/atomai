const mongoose = require("mongoose");

// DB schema
const usersSchema = new mongoose.Schema({
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

  limit: [{ limit: { type: Number }, category: { type: String } }],
  income: [
    {
      date: { type: Date },
      sum: { type: Number, required: true },
      name: { type: String },
      category: { type: String },
      date_created: { type: Date },
    },
  ],
  expenses: [
    {
      date: { type: Date },
      sum: { type: Number, required: true },
      date_created: { type: Date },
      name: { type: String },
      category: { type: String },
    },
  ],
});

// Modelis DB lentelės pavadinimas
const Users = new mongoose.model("Users", usersSchema);

// Duomenų siuntimas į DB
// const testUsers = new Users({
//   name: "Atomas Linas",
//   email: "atomas@gmail.com",
//   password: "123",
//   balance: 0,
//   limit: [{ category: "transport", limit: 200 }],
//   income: [
//     {
//       date: "2022-04-10",
//       sum: "1500",
//       name: "alga",
//     },
//     {
//       date: "2022-04-05",
//       sum: "2000",
//       name: "alga",
//     },
//   ],
//   expenses: [
//     {
//       date: "2022-04-14",
//       sum: "100",
//       name: "pica",
//       date_created: "2022-04-12",
//       category: "pramogos",
//     },
//     {
//       date: "2022-04-03",
//       sum: "50",
//       name: "mokesčiai",
//       date_created: "2022-04-11",
//       category: "pramogos",
//     },
//   ],
// });

// testUsers.save();

module.exports = Users;
