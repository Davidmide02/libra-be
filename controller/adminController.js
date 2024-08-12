const { body, validationResult } = require("express-validator");
const materialDb = require("../model/material");

exports.createMaterial = async (req, res, next) => {
  // check for authentication and authorization
  // validate req
  // materials properties -title,author,category,trackbook/state(available||reserved||), nos. available, image

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }
  const title = req.body.title;
  const author = req.body.author;
  const category = req.body.category; 
  const count = req.body.count;
  // const isbn = req.body.isnb;
  // const bookState = req.body.bookState;

  // reviews from users
  //   add available as defualt value and make it optional in database
  //   available||reserved||checkout||new

  // save to database
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
};

exports.getAllMaterial = async (req, res, next) => {
  const allMaterials = await materialDb.find();

  res.json({
    message: "materails fetched",
    allMaterials,
  });
};

exports.editMaterial = async (req, res, next) => {
  // get the id of the materials to be editted
  const { id } = req.params;
  // check if the materials exist in the Db
  const materialToEdit = await materialDb.findById(id);
  // get the updates sent from res
  const result = validationResult(req);
  if (!result.isEmpty()) {
    // console.log(result);
    return res.json({ errors: result.array() });
  }
  const title = req.body.title;
  const author = req.body.author;
  const category = req.body.category;
  const count = req.body.count;
  // const isbn = req.body.isnb;

  // update the result
  materialToEdit.title = title;
  materialToEdit.author = author;
  materialToEdit.category = category;
  materialToEdit.count = count;
  materialToEdit.save();

  // and save to the database
  return res.json({
    message: "editted succeffully",
    id,
    materialToEdit,
  });
};

exports.deleteMaterial = async (req, res, next) => {
  const { id } = req.params;
  // check if the materials exist in the Db
  const materialToDeleted = await materialDb.findByIdAndDelete(id);
  console.log(materialToDeleted);

  if (materialToDeleted === null) {
    return res.json({
      message: "Can't delete materail",
      id,
    });
  }
  // check if the materials exist in the Db
  // delete the material
  return res.json({
    message: "Material deleted succeffully",
    id,
    materialToDeleted,
  });
};
// 66b4dd9560194678ddab5cdf
// 66b4d9da6bdcf4ad85c8eb30
