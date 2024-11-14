const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const userDB = require("../model/user");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    return next(error);
  }
  const token = authHeader.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, `${jwt_secret}`);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  const user = await userDB.findById(req.userId).select("-password");

  if (user.role !== "admin") {
    const error = new Error("You're not authorize to access this");
    error.statusCode = 401;
    return next(error);
  }
  next();
};

// this is to make sure if the user is allow to perform a task
// it is use for protecting route
