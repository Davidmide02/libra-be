const { body, validationResult } = require("express-validator");
const materialDb = require("../model/material");

exports.createMaterial = async (req, res, next) => {
  // check for authentication and authorization
  // validate req
  // materials properties -title,author,category,trackbook/state(available||reserved||), nos. available, image

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
  // console.log(newMaterial);

  res.status(200).json({
    message: "Material added successfully",
    newMaterial,
  });
};

exports.editMaterial = async (req, res, next) => {
  const { id } = req.params;
  // get the id of the materials to be editted
  // check if the materials exist in the Db
  // get the updates and save to the database
  // const materialToedit = materialDb.findOneAndUpdate(id);
  // console.log(materialToedit);

  res.json({
    message: "editted succeffully",
    id,
  });
};

exports.deleteMaterial = (req, res, next) => {
  const { id } = req.params;
  // get the id of the materials to be editted
  // check if the materials exist in the Db
  // delete the material
  res.json({
    message: "Deleted succeffully",
    id,
  });
};
