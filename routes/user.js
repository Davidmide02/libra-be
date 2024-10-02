const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

// user/material
router.get("/material", userController.getAllMaterial);
router.get("/material/:materialId", userController.getSingleMaterial);
router.post("/request/:materialId", userController.requestMaterial);
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
