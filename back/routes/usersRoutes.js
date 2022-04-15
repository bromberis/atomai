const express = require("express");

const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require("../controllers/usersController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
