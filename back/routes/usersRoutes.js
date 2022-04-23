const express = require("express");

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  findIncomeDataAndUpdate,
  findExpensesDataAndUpdate,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:id/inc/:subID").patch(findIncomeDataAndUpdate);
router.route("/:id/exp/:subID").patch(findExpensesDataAndUpdate);

module.exports = router;
