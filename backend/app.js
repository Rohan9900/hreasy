const express = require("express");
const ErrorHandler = require("./utilis/errorHandler");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

//Import all routes
const employees = require("./routes/employee");
const auth = require("./routes/auth");
const todoTask = require("./routes/todotask");
const attendance = require("./routes/employeeAttendance");

app.use("/api/v1", employees);
app.use("/api/v1", auth);
app.use("/api/v1", todoTask);
app.use("/api/v1", attendance);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

//Middleware for Handling Error
app.use(ErrorHandler);

module.exports = app;
