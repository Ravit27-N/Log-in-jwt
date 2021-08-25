const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;
const store = require("store2")

const verifyToken = (req, res, next) => {
  const token = store.get(config.STORE_SECRETE);
  // console.log(token);
  try {
    const decoded = jwt.verify(token, config.SECRETE);
    req.user = decoded;
  } catch (err) {
    // return res.status(401).send("Invalid Token");
    res.redirect("/login");
  }
 
};

module.exports = verifyToken
