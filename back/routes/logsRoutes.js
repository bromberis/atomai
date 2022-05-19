const express = require("express");

const { createNewLog, registerNewUser } = require("./../controllers/logsController");

const router = express.Router();

router.route("/logs").post(createNewLog).get(registerNewUser);

module.exports = router;
