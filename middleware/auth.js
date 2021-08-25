const jwt = require("jsonwebtoken");
const config = process.env;
const store = require("store2")

const verifyToken = (req, res, next) => {
  
  const token = store.get(process.env.SECRETE);
  // console.log(token);
    
  try {
    const decoded = jwt.verify(token, process.env.SECRETE);
    req.user = decoded;
  } catch (err) {
    // return res.status(401).send("Invalid Token");
    return res.redirect("/login");
  }
  return next();

  
};

module.exports = verifyToken
