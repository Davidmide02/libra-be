const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();
const { body } = require("express-validator/check");

// auth/signup ....endpoint
router.post(
  "signup",
  [
    body("username").notEmpty().trim().withMessage("Add username"),
    body("email")
      .notEmpty()
      .withMessage("Adee email")
      .isEmail()
      .withMessage("Add a valide image")
      .trim()
      .withMessage("Add email")
      .isArray(),
    body("password").notEmpty().trim().withMessage("Add state"),
    body("status").notEmpty().trim().withMessage("Add category"),
    // body("count").notEmpty().isNumeric().withMessage("Add number"),
  ],
  authController.signup
);

module.exports = router;
