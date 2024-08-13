const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
  next();
});

// test run user
app.get("/user", (req, res, next) => {
  res.status(201).json({ come: "again" });
});

// any endpoint starting with admin will enter this route
app.use("/admin", adminRoutes);

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
    "mongodb+srv://davidmide07:MCxxoXAGCyATrXW3@lmscluster.37roy.mongodb.net/?retryWrites=true&w=majority&appName=lmsCluster"
  )
  .then(console.log("connected to databasee"), app.listen(8080));
