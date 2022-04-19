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

  limit: [{ category: String }, { limit: Number }],
  income: [{ sum: Number }, { date: Date }, { category: String }, { name: String }, { category: String }],
  expense: [{ date: Date }, { sum: Number, required: true }, { date_created: Date }, { name: String }, { category: String }],
});

// Modelis DB lentelės pavadinimas
const Users = new mongoose.model("Users", usersSchema);

// Duomenų siuntimas į DB
// const testStudents = new Students({
//   name: "Joana",
//   surname: "Baldyte",
//   birthdate: "1999-01-01",
//   program: "JavaScript",
//   town: "Kaunas",
//   group: "JS-1",
// });

// testStudents.save();

module.exports = Users;
