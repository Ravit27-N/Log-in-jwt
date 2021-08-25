const router = require("express").Router();
const { body, check } = require("express-validator");
const checkAuth = require("../middleware/auth");
const store = require("store2");

const {
    register,
    registerPage,
    login,
    loginPage,
    changepasswordPage,
    changepassword,
} = require("../controllers/userController");


//for testing
router.get("/welcome", checkAuth,(req,res)=>{
    res.send("hello you completed");
});


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
        body("name", "The name must be of minimum 3 characters length")
            .notEmpty()
            .escape()
            .trim()
            .isLength({ min: 3 }),
        body("email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
        body("confirm_password", "The confirm Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    register
);

router.get('/logout', (req, res, next) => {
    store.clear(); 
    res.redirect('/login');
});

router.get("/changepass", changepasswordPage);
router.post("/changepass",
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
        body("new_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
        body("confirm_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),

    ],
    changepassword
);



  

module.exports = router;