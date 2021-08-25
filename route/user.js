const express = require('express');
const router = express.Router();
const userController = require('../controllers/userHomeController');
const checkAuth  = require("../middleware/auth");


// Route
router.get('/',checkAuth, userController.view);
router.post('/',checkAuth , userController.find);
router.get('/adduser',checkAuth , userController.form);
router.post('/adduser',checkAuth , userController.create);
router.get('/edituser/:id',checkAuth , userController.edit);
router.post('/edituser/:id',checkAuth , userController.update);
router.get('/viewuser/:id',checkAuth , userController.viewall);
router.get('/:id',checkAuth ,userController.delete);
  
module.exports = router;