const router = require("express").Router();
const { body, check } = require("express-validator");
const auth = require("../middleware/auth");


const {
    homePage,
    register,
    registerPage,
    login,
    loginPage,
    changepasswordPage,
    changepassword,

} = require("../controllers/userController");


// const ifNotLoggedin = (req, res, next) => {
//     if(!req.user.id){
//         return res.redirect('/login');
//     }
//     next();
// }

const ifLoggedin =(req,res,next) => {

        if(req.user){
            return res.redirect('/welcome');
        }
   
    next();
}


// router.get('/', verifyToken , homePage);
// router.get('/', auth ,(req,res)=>{
//     res.send("Token is completed")
// })

router.get("/welcome", auth , homePage );

// router.get("/welcome", (req,res)=>{
//     var token = req.body.token
//     console.log("Form token is ",token);
//     res.json(token) 
// } );
 
// router.post("/welcome", auth, (req,res) => {
//     const user = req.user;
//     console.log(user);
//     res.status(200).send("Welcome 🙌");
//   });

const chceklogin = (req,res)=>{
    if(req.user){
        return res.redirect('/home');
    }
    else{
        return res.redirect('/login');
    }
}

// router.post("/", auth ,(req,res)=>{
//     // can req token 
//     if(req.user){
//         return res.redirect('/home');
//     }
//     //can not go to login
//     else{
//         return res.redirect('/login');
//     }
// });

router.get("/login",loginPage);
router.post("/login",
    [
        body("email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ]
     ,login
);
// login

router.get("/signup",registerPage);
router.post(
    "/signup",
    [
        body("_name", "The name must be of minimum 3 characters length")
            .notEmpty()
            .escape()
            .trim()
            .isLength({ min: 3 }),
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
        body("_confirm_password", "The confirm Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    register
);

router.get('/logout', (req, res, next) => {
    res.redirect('/login');
});
////delete token 
// router.get('/logout', function(req, res) {
//     res.status(200).send({ auth: false, token: null });
//   });

router.get("/changepass", changepasswordPage);
router.post("/changepass",
    [
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
        body("_new_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
        body("_confirm_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),

    ],
    changepassword
);


// const userController = require('../controllers/userHomeController');
// // const checkToken  = require("../middleware/auth");
// //Route
// router.get('/home',auth, userController.view);
// router.post('/home', userController.find);
// router.get('/adduser', userController.form);
// router.post('/adduser', userController.create);
// router.get('/edituser/:id', userController.edit);
// router.post('/edituser/:id', userController.update);
// router.get('/viewuser/:id', userController.viewall);
// router.get('/:id',userController.delete);
  

module.exports = router;