const materialDb = require("../model/material");
const requestDb = require("../model/request");

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
    res.json({
      message: "Material request successful",
      newRequest,
    });
  } catch (error) {
    next(error);
  }
};
