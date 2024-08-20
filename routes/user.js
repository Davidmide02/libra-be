const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const userDb = require("../model/user");
const { body } = require("express-validator");
// get all material
// user/material
router.get("/material", userController.getAllMaterial);

// user request for a material
// endpoint
// user/request/:materialId
router.post("/request/:materialId", userController.requestMaterial);

// rate/review
// create review model
// matetial id
// user id
// rate and comment
// endpoint
// user/review/:materialId
router.post("/review/:materialId", userController.reviewMaterial);

// register
// login
// see email for log in
// see available books
// reserve books/materials
// subscription state
//  free subscription access to limited material 2. limited borrows
// paid per month or week
module.exports = router;