const { validationResult } = require("express-validator");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // const error = new Error('Validation failed');
    // error.data =errors.array();
    // throw error;
    return res.json({
        message:'Validation Falied'
    })
  }

  const username = req.body.username;
  const email = req.body.email;
  const password= req.body.password;
};
