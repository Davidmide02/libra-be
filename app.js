const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminAuthMiddleware = require("./middleware/adminAuthmiddleware");
const userAuthMiddleware = require("./middleware/userAuthMiddleware");
const cors = require("cors");
const path = require("path");
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

app.use(bodyParser.json());
app.use(
  cors({
    // origin: "http://localhost:5173",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);

// , adminAuthMiddleware
app.use("/admin", adminAuthMiddleware, adminRoutes);
app.use("/user", userAuthMiddleware, userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRoutes);
// error middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message, data });
});
const port = process.env.PORT || 8040;
mongoose
  .connect(
    `mongodb+srv://${db_username}:${db_password}@lmscluster.37roy.mongodb.net/?retryWrites=true&w=majority&appName=lmsCluster`
  )
  .then(
    console.log("connected to databasee"),

    app.listen(port)
  )
  .catch((err) => {
    console.log("Cannot connect to database");
    // console.log(err.message);
  });
