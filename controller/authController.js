const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userDb = require("../model/user");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.data = errors.array();
    error.statusCode = 402;
    return next(error);
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role || "user";
  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new userDb({
      email,
      password: hashedPw,
      username,
      role, 
    });
    await user.save();
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      `${jwt_secret}`,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "You've register succefully",
      email,
      username,
      role: user.role,
      token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.data = errors.array();
    error.statusCode = 422;
    return next(error);
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await userDb.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 422;
      return next(error);
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      "longsupersecret",
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Login successfully",
      email,
      userId: user._id.toString(),
      token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//  if a user as already request a material before now . it should flag it
//  get the userid of the request and check if it is  not present in the existing  users
// if it is present it should return with the message you already request this material
