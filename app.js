const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminAuthMiddleware = require("./middleware/adminAuthmiddleware");
const userAuthMiddleware = require("./middleware/userAuthMiddleware");
const path = require("path");
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/admin", adminAuthMiddleware, adminRoutes);
app.use("/user", userAuthMiddleware, userRoutes);
app.use("/auth", authRoutes);

// error middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message, data });
});

mongoose
  .connect(
    `mongodb+srv://${db_username}:${db_password}@lmscluster.37roy.mongodb.net/?retryWrites=true&w=majority&appName=lmsCluster`
  )
  .then(
    console.log("connected to databasee"),
    app.listen(8040 || process.env.PORT)
  )
  .catch((err) => {
    console.log("Cannot connect to database");
    // console.log(err.message);
  });
