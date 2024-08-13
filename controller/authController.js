const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userDb = require("../model/user");

exports.signup = (req, res, next) => {
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
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new userDb({
        email,
        password: hashedPw,
        username,
      });
      return res.json({ message: "You've register succefully", user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
