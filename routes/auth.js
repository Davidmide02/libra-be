const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();
const userDb = require("../model/user");
const { body } = require("express-validator");

// auth/signup ....endpoint
router.post(
  "signup",
  [
    body("username").notEmpty().trim().withMessage("Add username"),
    body("email")
      .notEmpty()
      .withMessage("Add email")
      .isEmail()
      .withMessage("Add a valid email")
      .trim()
      .custom((value, { req }) => {
        return userDb.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists");
          }
        });
      }),
    body("password").notEmpty().trim().withMessage("Add state"),
    body("status").notEmpty().trim().withMessage("Add category"),
    // body("count").notEmpty().isNumeric().withMessage("Add number"),
  ],
  authController.signup
);

module.exports = router;
