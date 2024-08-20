const materialDb = require("../model/material");
const requestDb = require("../model/request");
const reviewDb = require("../model/review");

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

exports.requestMaterial = async (req, res, next) => {
  // check if the book is available
  // check the count
  const { materialId } = req.param;
  const userId = req.body.userId;

  try {
    const newRequest = new requestDb({
      satus: "Pending",
    });
    newRequest.materials.push(materialId);
    newRequest.users.push(userId);
    await newRequest.save();
    const material = materialDb.findById(materialId);
    if (!material) {
      const error = new Error("material not found");
      error.statusCode = 500;
      throw error;
    }
    material.requests.push(newRequest._id);
    await material.save();
    res.json({
      message: "Material request successful",
      newRequest,
    });
  } catch (error) {
    next(error);
  }
};

exports.reviewMaterial = async (req, res, next) => {
  // check if the book is available
  // check the count
  const { materialId } = req.param;
  const userId = req.body.userId;
  const rating = req.body.rating;
  const comment = req.body.comment;

  try {
    const createReview = new reviewDb({
      material: materialId,
      rating,
      comment,
      user: userId,
    });

    await createReview.save();
    const material = materialDb.findById(materialId);
    if (!material) {
      const error = new Error("material not found");
      error.statusCode = 500;
      throw error;
    }
    material.reviews.push(createReview._id);
    await material.save();
    // add the new review into the material model
    res.json({
      message: "Material reviewed successfully",
      createReview,
    });
  } catch (error) {
    next(error);
  }
};
