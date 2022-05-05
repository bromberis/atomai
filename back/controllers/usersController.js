const Users = require("../models/userModel");

// Gauti visus userius
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//Gauti user income
exports.getUserIncomeByMonth = async (req, res) => {
  // console.log(req.params.id);
  try {
    const users = await Users.find({ _id: req.params.id });

    const { income } = users[0];
    // console.log(income);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    console.log(currentMonth);

    const filteredYear = income.filter(
      (incItem) => incItem.date.getFullYear() === currentYear
    );

    const filteredMonth = filteredYear.filter(
      (item) => item.date.getMonth() + 1 === currentMonth
    );

    const allIncomeCurrentMonth = filteredMonth.reduce(
      (n, { sum }) => n + sum,
      0
    );

    // console.log(allIncomeCurrentMonth);

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        income: allIncomeCurrentMonth,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

//Gauti ekspenses

exports.getUserExpensesByMonth = async (req, res) => {
  // console.log(req.params.id);
  try {
    const users = await Users.find({ _id: req.params.id });

    const { expenses } = users[0];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    console.log(currentMonth);

    const filteredYear = expenses.filter(
      (expItem) => expItem.date.getFullYear() === currentYear
    );

    const filteredMonth = filteredYear.filter(
      (item) => item.date.getMonth() + 1 === currentMonth
    );

    const allExpensesCurrentMonth = filteredMonth.reduce(
      (n, { sum }) => n + sum,
      0
    );

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        expenses: allExpensesCurrentMonth,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

// Sukurti Userį
exports.createUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Gauti naudotoją pagal ID
exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        users: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Atnaujinti esamą userį
exports.updateUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      // atnaujinus duomenis - gauti atnaujintą studento informaciją
      new: true,
      // papildomai patikrintų duomenis pagal DB schemą (studentModel)
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Pašalinti userį pagal ID
exports.deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findIncomeDataAndUpdate = async (req, res) => {
  try {
    const updateIncome = await Users.findOneAndUpdate(
      { _id: req.params.id, "income._id": req.params.subID },
      {
        $set: {
          "income.$.name": req.body.name,
          "income.$.date": req.body.date,
          "income.$.category": req.body.category,
          "income.$.sum": req.body.sum,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        income: updateIncome,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findExpensesDataAndUpdate = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);
  console.log(req.body);
  try {
    const updateExpenses = await Users.findOneAndUpdate(
      { _id: req.params.id, "expenses._id": req.params.subID },
      {
        $set: {
          "expenses.$.name": req.body.name,
          "expenses.$.date": req.body.date,
          "expenses.$.category": req.body.category,
          "expenses.$.sum": req.body.sum,
        },
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        expenses: updateExpenses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// delete income

exports.findIncomeAndDelete = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);

  try {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          income: { _id: req.params.subID },
        },
      }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// delete expenses

exports.findExpensesAndDelete = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);

  try {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          expenses: { _id: req.params.subID },
        },
      }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Add user income
exports.createUserIncome = async (req, res) => {
  try {
    const updated = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { income: req.body } },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        tour: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createUserExpense = async (req, res) => {
  try {
    const updated = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { expenses: req.body } },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        tour: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
