const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userDb = require("../model/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.data = errors.array();
    error.statusCode = 402;
    throw error;
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new userDb({
      email,
      password: hashedPw,
      username,
    });
    await user.save();
    return res.json({ message: "You've register succefully", user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
