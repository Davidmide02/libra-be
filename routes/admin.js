const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
const { body, check } = require("express-validator/check");

// /admin/create
router.post(
  "/create",
  [
    body("title").notEmpty().trim().withMessage("Add title"),
    body("author").notEmpty().trim().withMessage("Add author").isArray(),
    body("bookState").notEmpty().trim().withMessage("Add state"),
    body("category").notEmpty().trim().withMessage("Add category"),
    body("count").notEmpty().isNumeric().withMessage("Add number"),
  ],
  adminController.createMaterial
);
// get all materials

router.get("/", adminController.getAllMaterial);

router.put(
  "/edit/:id",
  [
    body("title").notEmpty().trim().withMessage("Add title"),
    body("author").notEmpty().trim().withMessage("Add author").isArray(),
    body("bookState").notEmpty().trim().withMessage("Add state"),
    body("category").notEmpty().trim().withMessage("Add category"),
    body("count").notEmpty().isNumeric().withMessage("Add number"),
  ],
  adminController.editMaterial
);
router.put("/delete/:id", adminController.deleteMaterial);

module.exports = router;

// Admin endpoints
// - add materials
// -update materials
// -delete materials
//  approve loans
// -id of the user
// -id of the materials
// check if the materials count is out already
// if yes return not avaliable
// else approved and decrease the count
// MCxxoXAGCyATrXW3
// mongodb+srv://davidmide07:<password>@lmscluster.37roy.mongodb.net/?retryWrites=true&w=majority&appName=lmsCluster
