const express = require("express");
const adminController = require("../controller/adminController");
const   router = express.Router();
const { body, check } = require("express-validator");
const multer = require("multer");
const path = require("path");
const handleValidationErrors = require("../middleware/validateMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extension);
  },
});
const upload = multer({ storage: storage });

const validateMaterial = [
  body("title").notEmpty().trim().withMessage("Add title"),
  body("author").notEmpty().isArray().withMessage("Add author array"),
  body("category").notEmpty().trim().withMessage("Add category"),
  body("count").notEmpty().isNumeric().withMessage("Add a numeric count"),
];

const parseRequestData = (req, res, next) => {
  // Parse author as JSON if it's a string
  if (typeof req.body.author === "string") {
    try {
      req.body.author = JSON.parse(req.body.author);
    } catch (err) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid author format", path: "author" }] });
    }
  }

  // Convert count to a number
  if (req.body.count) {
    req.body.count = Number(req.body.count);
  }

  next();
};

// /admin/create
router.post(
  "/create",
  parseRequestData,
  validateMaterial,
  handleValidationErrors,
  upload.single("file"),
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
router.get("/users", adminController.getAllUsers);

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
