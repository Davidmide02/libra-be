const materialDb = require("../model/material");
const requestDb = require("../model/request");
const reviewDb = require("../model/review");

exports.getAllMaterial = async (req, res, next) => {
  try {
    const allMaterials = await materialDb.find();
    if (!allMaterials) {
      const error = new Error("Can't fetch materials");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      message: "materials fetched",
      allMaterials,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSingleMaterial = async (req, res, next) => {
  const { materialId } = req.params;

  try {
    const material = await materialDb.findById(materialId);

    if (!material) {
      const error = new Error("material not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.json({ message: "Single material", material });
  } catch (error) {
    next(error);
  }
};

exports.requestMaterial = async (req, res, next) => {
  
  const { materialId } = req.params;
  const userId = req.body.userId;


  try {
    const newRequest = new requestDb({
      satus: "Pending",
    });
    newRequest.materials.push(materialId);
    newRequest.users.push(userId);
    await newRequest.save();
    const material = await materialDb.findById(materialId);

    if (!material) {
      const error = new Error("material not found");
      error.statusCode = 404;
      return next(error);
    }

    material.requests.push(newRequest._id);
    await material.save();
    return res.json({
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
  const { materialId } = req.params;
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
    const material = await materialDb.findById(materialId);
    if (!material) {
      const error = new Error("material not found");
      error.statusCode = 404;
      return next(error);
    }
    material.reviews.push(createReview._id);
    await material.save();

    res.json({
      message: "Material reviewed successfully",
      createReview,
    });
  } catch (error) {
    next(error);
  }
};

// Error: Can't set headers after they are sent to the client
// request id "66ca386a583d34eda00f4acc"
