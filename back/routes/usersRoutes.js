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
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

//income
router.route("/:id/inc/upd/:subID").patch(findIncomeDataAndUpdate);
router.route("/:id/inc/dlt/:subID").patch(findIncomeAndDelete);

//expenses
router.route("/:id/exp/upd/:subID").patch(findExpensesDataAndUpdate);
router.route("/:id/exp/dlt/:subID").patch(findExpensesAndDelete);

module.exports = router;
