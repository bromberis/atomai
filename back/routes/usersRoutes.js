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
} = require("../controllers/usersController");

const router = express.Router();

router.route("/login").get(loginUser);
router.route("/register").post(createUser);
// router.route("/email").get(getUserEmail);
router.route("/").get(getAllUsers);
router.route("/email").get(getUserEmail);

router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

//income

router.route("/:id/inc/upd/:subID").patch(findIncomeDataAndUpdate);
router.route("/:id/inc/dlt/:subID").patch(findIncomeAndDelete);
router.route("/:id/inc").patch(createUserIncome);
router.route("/:id/exp").patch(createUserExpense);

//expenses
router.route("/:id/exp/upd/:subID").patch(findExpensesDataAndUpdate);
router.route("/:id/exp/dlt/:subID").patch(findExpensesAndDelete);

module.exports = router;
