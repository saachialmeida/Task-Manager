const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  console.log(authHeader);

  if (!authHeader) {
    res.status(401).json({ message: "Not authenticated" });

    // const error = new Error("Not authenticated.");
    // error.statusCode = 401;
    // throw error;
  }
  const token = authHeader.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    // err.statusCode = 500;
    // throw err;
    res.status(401).json({ message: "Token Expired" });
  }
  if (!decodedToken) {
    // const error = new Error("Not authenticated.");
    // error.statusCode = 401;
    // throw error;
    res.status(401).json({ message: "Not authenticated" });
  }
  req.userId = decodedToken.userId;
  next();
};
