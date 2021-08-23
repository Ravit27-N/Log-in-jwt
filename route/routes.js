const router = require("express").Router();
const { body } = require("express-validator");
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

// const ifLoggedin =(req,res,next) => {
//     if(req.user.id){
//         return res.redirect('/');
//     }
//     next();
// }


// router.get('/', verifyToken , homePage);
// router.get('/', auth ,(req,res)=>{
//     res.send("Token is completed")
// })

router.get("/welcome", homePage );
router.post("/welcome", auth, (req, res) => {
    const user = req.user;
    console.log(user);
    res.status(200).send("Welcome 🙌");
  });

router.get("/login", loginPage);
router.post("/login",
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
    ],
    login
);

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
module.exports = router;