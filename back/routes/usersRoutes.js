const express = require("express");
const {
  getUsersByEmail,
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
  loginUser,
  getUserIncomeByMonth,
  getUserExpensesByMonth,
  getAllUserIncomeByMonth,
  getAllUserExpensesByMonth,
  getAllUserLimits,
  createUserLimits,
  findLimitAndUpdate,
  findLimitAndDelete,
  getUserExpensesThisMonth,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/userByEmail").post(getUsersByEmail);
router.route("/login").post(loginUser);
router.route("/register").post(createUser);
// router.route("/email").get(getUserEmail);
router.route("/").get(getAllUsers);
router.route("/email").get(getEmail);

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
router.route("/:id/exp/thismonth").get(getUserExpensesThisMonth);
router.route("/:id/exp").patch(createUserExpense).get(getUserExpensesByMonth);

//limits

router.route("/:id/limits/upd/:subID").patch(findLimitAndUpdate);
router.route("/:id/limits/dlt/:subID").patch(findLimitAndDelete);
router.route("/:id/limits").get(getAllUserLimits).patch(createUserLimits);

module.exports = router;
