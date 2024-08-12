const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userDb = require("../model/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // const error = new Error('Validation failed');
    // error.data =errors.array();
    // throw error;
    return res.json({
      message: "Validation Falied",
    });
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const userDb = new userDb({
        email,
        password: hashedPw,
        username,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
