const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();
const userDb = require("../model/user");
const { body } = require("express-validator");

// auth/signup ....endpoint
router.post(
  "/signup",
  [
    body("username").notEmpty().trim().withMessage("Add username"),
    body("email")
      .notEmpty()
      .withMessage("Add email")
      .isEmail()
      .withMessage("Add a valid email")
      .trim()
      .custom(async (value, { req }) => {
        console.log("this is value:", value);
        console.log("req value:", req.body.email);
        try {
          const userDoc = await userDb.findOne({ email: value });
          console.log("user first:", userDoc);
          if (userDoc) {
            console.log(" console Email address already exists");
            return Promise.reject("Email address already exists");
          }
        } catch (error) {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        }
      }),
    body("password").notEmpty().withMessage("Add password").trim(),
    
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Add email")
      .isEmail()
      .withMessage("Add a valid email")
      .trim(),
    body("password").notEmpty().withMessage("Input password").trim().withMessage("Add state"),
  ],
  authController.login
);

module.exports = router;
