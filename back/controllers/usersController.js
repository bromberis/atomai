const Users = require("../models/userModel");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

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
  try {
    const users = await Users.find({ _id: req.params.id });
    const { income } = users[0];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const filteredYear = income.filter((incItem) => incItem.date.getFullYear() === currentYear);

    const filteredMonth = filteredYear.filter((item) => item.date.getMonth() + 1 === currentMonth);

    const allIncomeCurrentMonth = filteredMonth.reduce((n, { sum }) => n + sum, 0);

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

exports.getAllUserIncomeByMonth = async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);

    if (users.income.length > 0) {
      const { income } = users;

      var sortedIncomeByDate = income.sort(function (a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c - d;
      });

      const startYear = sortedIncomeByDate[0].date.getFullYear();
      const endYear = sortedIncomeByDate[sortedIncomeByDate.length - 1].date.getFullYear();
      const incomeArray = [];

      for (var i = startYear; i <= endYear; i++) {
        var filteredYear = sortedIncomeByDate.filter((item) => item.date.getFullYear() === i);

        var yearArray = [];
        yearArray.push({ year: i });
        var monthArray = [];

        for (var y = 1; y <= 12; y++) {
          if (filteredYear.filter((item) => item.date.getMonth() + 1 === y)) {
            var filteredMonth = filteredYear.filter((item) => item.date.getMonth() + 1 === y);
            var allIncome = filteredMonth.reduce((n, { sum }) => n + sum, 0);
            monthArray.push(allIncome);
          } else {
            monthArray.push(0);
          }
        }

        var merged = [];

        yearArray.map((year) => {
          merged.push({
            yearInc: year.year,
            dataInc: monthArray,
          });
        });
        incomeArray.push(...merged);
      }

      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          income: incomeArray,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

//Gauti ekspenses

exports.getUserExpensesByMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });

    const { expenses } = users[0];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const filteredYear = expenses.filter((expItem) => expItem.date.getFullYear() === currentYear);

    const filteredMonth = filteredYear.filter((item) => item.date.getMonth() + 1 === currentMonth);

    const allExpensesCurrentMonth = filteredMonth.reduce((n, { sum }) => n + sum, 0);

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

exports.getUserExpensesThisMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });

    const { expenses } = users[0];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const filteredYear = expenses.filter((expItem) => expItem.date.getFullYear() === currentYear);

    const filteredMonth = filteredYear.filter((item) => item.date.getMonth() + 1 === currentMonth);

    // const allExpensesCurrentMonth = filteredMonth.reduce(
    //   (n, { sum }) => n + sum,
    //   0
    // );

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        expenses: filteredMonth,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.getAllUserExpensesByMonth = async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);
    if (users.expenses.length > 0) {
      const { expenses } = users;

      var sortedExpensesByDate = expenses.sort(function (a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c - d;
      });

      const startYear = sortedExpensesByDate[0].date.getFullYear();
      const endYear = sortedExpensesByDate[sortedExpensesByDate.length - 1].date.getFullYear();
      const expensesArray = [];

      for (var i = startYear; i <= endYear; i++) {
        var filteredYear = sortedExpensesByDate.filter((item) => item.date.getFullYear() === i);

        var yearArray = [];
        yearArray.push({ year: i });
        var monthArray = [];

        for (var y = 1; y <= 12; y++) {
          if (filteredYear.filter((item) => item.date.getMonth() + 1 === y)) {
            var filteredMonth = filteredYear.filter((item) => item.date.getMonth() + 1 === y);
            var allExpenses = filteredMonth.reduce((n, { sum }) => n + sum, 0);
            monthArray.push(allExpenses);
          } else {
            monthArray.push(0);
          }
        }

        var merged = [];

        yearArray.map((year) => {
          merged.push({
            yearExp: year.year,
            dataExp: monthArray,
          });
        });

        expensesArray.push(...merged);
      }

      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          expenses: expensesArray,
        },
      });
    }
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
    const user = await Users.create(req.body);
    res.status(200).json({
      status: "success",
      results: user.length,
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

// get user BY email
exports.getUsersByEmail = async (req, res) => {
  try {
    const user = await Users.find({ email: req.body.email });

    res.status(200).json({
      status: "success",
      results: user.length,
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

//get user email

exports.getEmail = async (req, res) => {
  try {
    const user = await Users.exists(req.query);

    res.status(200).json({
      status: "success",
      results: user.length,
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

//gauti userio

// Sukurti Userį
exports.createUser = async (req, res) => {
  try {
    let email = req.body.email;
    let user = await Users.findOne({ email });
    if (user) return res.status(400).send("User already registered.");

    var result = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign({ id: result._id }, "labas", {
      expiresIn: "90d",
    });

    //const newUser = awai`t Users.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        user: result,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
// exports.signup = async (req, res) => {
//   try {
//     const newUser = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       passwordConfirm: req.body.passwordConfirm,
//     });

//     const token = jwt.sign({ id: newUser._id }, "labas", {
//       expiresIn: "90d",
//     });

//     res.status(200).json({
//       status: "success",
//       token: token,
//       data: {
//         user: newUser,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
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
exports.deleteUserById = async (req, res) => {
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

//INCOME

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
        user: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findIncomeAndDelete = async (req, res) => {
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

//EXPENSES

exports.findExpensesDataAndUpdate = async (req, res) => {
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

exports.findExpensesAndDelete = async (req, res) => {
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
        user: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//USER

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Ar yra vartotojo vardas ir slaptažodis
  if (!email || !password) {
    return res.status(404).json({
      status: "fail",
      message: "Neįvestas prisijungimo vardas arba slaptažodis.",
    });
  }

  // 2) Randame vartotoja ir patikrinsime ar tinka passwordas
  const user = await Users.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(404).json({
      status: "fail",
      message: "Neteisingas prisijungimo vardas arba slaptažodis",
    });
  }

  const token = jwt.sign({ id: user._id }, "labas", {
    expiresIn: "90d",
  });

  res.status(200).json({
    status: "success",
    token: token,
    user: user,
  });
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, "labas");

  // 3) Check if user still exists
  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist.",
    });
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

//LIMITS

exports.getAllUserLimits = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { limit } = users[0];

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        limits: limit,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.createUserLimits = async (req, res) => {
  try {
    const updatedLimits = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { limit: req.body } },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        limit: updatedLimits,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findLimitAndUpdate = async (req, res) => {
  try {
    const updateLimit = await Users.findOneAndUpdate(
      { _id: req.params.id, "limit._id": req.params.subID },
      {
        $set: {
          "limit.$.limit": req.body.limit,
          "limit.$.category": req.body.category,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        limit: updateLimit,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findLimitAndDelete = async (req, res) => {
  try {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          limit: { _id: req.params.subID },
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

exports.updateUserById = async (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  try {
    await Users.findByIdAndUpdate(req.body.id, req.body);
    res.status(200).json({
      status: "success",
      data: Users,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// exports.deleteUser = async (req, res) => {
//   try {
//     await Users.findOneAndDelete({ _id: req.params.id });
//     res.status(200).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
