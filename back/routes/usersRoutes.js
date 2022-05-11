const express = require("express");

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  findIncomeDataAndUpdate,
  findExpensesDataAndUpdate,
  findIncomeAndDelete,
  findExpensesAndDelete,
  createUserIncome,
  createUserExpense,
  getEmail,
  getUserEmail,
  loginUser,
  getUserIncomeByMonth,
  getUserExpensesByMonth,
  getAllUserIncomeByMonth,
  getAllUserExpensesByMonth,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(createUser);
// router.route("/email").get(getUserEmail);
router.route("/").get(getAllUsers);
router.route("/email").get(getUserEmail);

router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

//income

router.route("/:id/inc/upd/:subID").patch(findIncomeDataAndUpdate);
router.route("/:id/inc/dlt/:subID").patch(findIncomeAndDelete);
router.route("/:id/inc/all").get(getAllUserIncomeByMonth);
router.route("/:id/inc").patch(createUserIncome).get(getUserIncomeByMonth);

//expenses
router.route("/:id/exp/upd/:subID").patch(findExpensesDataAndUpdate);
router.route("/:id/exp/dlt/:subID").patch(findExpensesAndDelete);
router.route("/:id/exp/all").get(getAllUserExpensesByMonth);
router.route("/:id/exp").patch(createUserExpense).get(getUserExpensesByMonth);

module.exports = router;
