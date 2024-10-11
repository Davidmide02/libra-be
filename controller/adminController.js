const { body, validationResult } = require("express-validator");
const materialDb = require("../model/material");
const { Error } = require("mongoose");
const userDb = require("../model/user");

exports.createMaterial = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }
  const title = req.body.title;
  const author = req.body.author;
  const category = req.body.category;
  const count = req.body.count;

  try {
    const newMaterial = new materialDb({
      title,
      author,
      category,
      count,
    });
    await newMaterial.save();
    res.status(200).json({
      message: "Material added successfully",
      newMaterial,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllMaterial = async (req, res, next) => {
  try {
    const allMaterials = await materialDb.find();
    res.json({
      message: "materials fetched",
      allMaterials,
    });
  } catch (error) {
    next(error);
  }
};

exports.editMaterial = async (req, res, next) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }

  const title = req.body.title;
  const author = req.body.author;
  const category = req.body.category;
  const count = req.body.count;
  try {
    const materialToEdit = await materialDb.findById(id);
    if (!materialToEdit) {
      const error = new Error("Material not found");
      error.statusCode = 404;
      return next(error);
    }
    await materialToEdit({
      title,
      author,
      category,
      count,
    });
    await materialToEdit.save();
    return res.json({
      message: "editted succeffully",
      id,
      materialToEdit,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteMaterial = async (req, res, next) => {
  const { id } = req.params;

  try {
    const materialToDeleted = await materialDb.findByIdAndDelete(id);
    if (!materialToDeleted) {
      const error = new Error("Can't delete material");
      error.statusCode = 404;
      return next(error);
    }

    return res.json({
      message: "Material deleted successfully",
      id,
      materialToDeleted,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userDb.find().select("-password");
    if (!users) {
      const error = new Error("Can't fetch users, try again");
      error.statusCode = 403;
      return next(error);
    }

    res.json({ message: "All users fetched", users });
  } catch (error) {
    next(error)
  }
};


// 66b4dd9560194678ddab5cdf
// 66b4d9da6bdcf4ad85c8eb30
