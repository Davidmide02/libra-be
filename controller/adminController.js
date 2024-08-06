exports.createMaterial = (req, res, next) => {
  // check for authentication and authorization

  const materialTitle = req.body.title;
  const author = req.body.author;
  const isbn = req.body.isnb;
//   add available as defualt value and make it optional in database
//   const trackBook = req.body.trackBook;
  const category = req.body.category;

  //   available||reserved||checkout||new

  //   member subscription
  // membership type
  // renewal

  res
    .status(200)
    .json({
      message: "Material add successfully",
      material: "title",
      materialTitle,
      author,
    });
};

exports.editMaterial = (req, res, next) => {
  // get the id of the materials to be editted
  // check if the materials exist in the Db
  // get the updates and save to the database
};

exports.deleteMaterial = (req, res, next) => {
  // get the id of the materials to be editted
  // check if the materials exist in the Db
  // delete the material
};
