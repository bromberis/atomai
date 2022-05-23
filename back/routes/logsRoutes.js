const express = require("express");

const { createNewLog, getAllLogs } = require("./../controllers/logsController");

const router = express.Router();

router.route("/newLog/").post(createNewLog);
router.route("/allLogs").get(getAllLogs);

module.exports = router;
