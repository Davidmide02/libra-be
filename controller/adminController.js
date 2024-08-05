exports.createMaterial = (req, res, next) => {
  // check for authentication and authorization

  const materialTitle = req.body.title;
  const author = req.body.author;
  const iSNb = req.body.isnb;

  res
    .status(200)
    .json({ message: "Material add successfully", material: "title" });
};

exports.editMaterial = (req,res,next) =>{
    // get the id of the materials to be editted
    // check if the materials exist in the Db
    // get the updates and save to the database

}



exports.deleteMaterial = (req,res,next) =>{
    // get the id of the materials to be editted
    // check if the materials exist in the Db
    // delete the material

}
