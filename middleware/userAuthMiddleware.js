const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("No credentials for authentication");
    error.statusCode = 401;
    return next(error);
  }
  const token = authHeader.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            return res
              .status(401)
              .send("Token has expired, please log in again");
          }
          return res.status(401).send("Fail to authenticate");
          // return reject(new Error("Failed to authenticate token"));
        }
        resolve(decoded);
      });
    });

    // console.log("token:", decodedToken);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// it is use for protecting route
