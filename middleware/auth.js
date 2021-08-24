const jwt = require("jsonwebtoken");
const config = process.env;
const store = require("store2")

const verifyToken = (req, res, next) => {
  
  const token = store.get('tokenkey');
  // console.log(token);

  if (!token) {
    return res.status(403).send("A token is required for authentication"); 
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRETE);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

    return next();

  
};

module.exports = verifyToken
