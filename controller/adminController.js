const { body, validationResult } = require("express-validator");
const materialDb = require("../model/material");
const userDb = require("../model/user");
const user = require("../model/user");

exports.createMaterial = async (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const category = req.body.category;
  const count = req.body.count;

  if (!req.file) {
    const error = new Error("No image found, Upload a image");
    error.statusCode = 404;
    return next(error);
  }
  const image = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  try {
    const numberofMaterial = materialDb.length();
    if (numberofMaterial >= 10) {
      
      res.status(403).json({
        message:
          "Material can't be added, the numbers of materials has been exceeded ",
       
      });
    }
    const newMaterial = new materialDb({
      title,
      author,
      category,
      count,
      image,
    });
    await newMaterial.save();
    res.status(200).json({
      message: "Material added successfully",
      newMaterial,
      title,
      image,
      category,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllMaterial = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const allMaterials = await materialDb.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metaData: [
            {
              $count: "totalMaterials",
            },
            {
              $addFields: {
                pageNumber: page,
                totalPages: { $ceil: { $divide: ["$totalMaterials", limit] } },
              },
            },
          ],
          data: [
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
        },
      },

      { $addFields: { "metaData.itemsOnPage": { $size: "$data" } } },
    ]);
    // image serve
    // const materialsWithImageUrl = materials.map(material => ({
    //   ...material.toObject(),
    //   image: `${req.protocol}://${req.get('host')}${material.image}`, // Full URL for the image
    // }));

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
    const { page = 1, limit = 5 } = req.query;
    const users = await userDb.aggregate([
      { $match: { role: "user" } },
      { $project: { password: 0 } },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metaData: [
            {
              $count: "totalUsers",
            },
            {
              $addFields: {
                pageNumber: page,
                totalPages: { $ceil: { $divide: ["$totalUsers", limit] } },
              },
            },
          ],
          data: [
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
        },
      },

      { $addFields: { "metaData.itemsOnPage": { $size: "$data" } } },
    ]);
    // .select("-password");
    if (!users) {
      const error = new Error("Can't fetch users, try again");
      error.statusCode = 403;
      return next(error);
    }

    res.json({ message: "All users fetched", users });
  } catch (error) {
    next(error);
  }
};

// approve requst
// decline request

// 66b4dd9560194678ddab5cdf
// 66b4d9da6bdcf4ad85c8eb30
