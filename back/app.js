const express = require("express");
const { get } = require("http");

const usersRoutes = require("./routes/usersRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/users", usersRoutes);

module.exports = app;
