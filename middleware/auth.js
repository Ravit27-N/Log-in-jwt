const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token = await req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization']
  
  console.log(token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "hello");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
