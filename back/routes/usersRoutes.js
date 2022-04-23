const express = require("express");

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  findIncomeDataAndUpdate,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:id/:subID").patch(findIncomeDataAndUpdate);

module.exports = router;
