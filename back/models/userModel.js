const mongoose = require("mongoose");

// DB schema
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  dob: {
    type: String,
  },
  program: {
    type: String,
  },
  city: {
    type: String,
  },
  group: {
    type: String,
  },
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
