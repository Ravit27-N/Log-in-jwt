const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const dbConnection = require("../utils/dbConnection");
require("dotenv").config();
const jwt = require("jsonwebtoken");



exports.homePage = async (req, res, next) => {
    // select from user Token
    // console.log(req.user.id);
    // const [row] = await dbConnection.execute("SELECT * FROM `users` WHERE `id`=?", req.user.id);

    // if (row.length !== 1) {
    //     return res.redirect('/logout');
    // }
    // res.render('home1', {
    //     userInfo: row[0]
    // });
    res.send('hello world');
   
}


// Register Page
exports.registerPage = (req, res, next) => {
    res.render("register");
};

// User Registration
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('register', {
            error: errors.array()[0].msg
        });
    }
    try {
        // connect to db 
        const [row] = await dbConnection.execute(
            "SELECT * FROM `users` WHERE `email`=? ;",
            [body._email]
        );
            // check have already or not
        if (row.length >= 1) {
            return res.render('register', {
                error: 'This email already in use.'
            });
        }
            //compare confirm password and password
        if (body._password!==body._confirm_password) {
            return res.render('register', {
                error: 'Password and confirm password is incorrect.'
            });
        }
        // encrypt passwrod 
        const hashPass = await bcrypt.hash(body._password, 12);
        //insert data to db
        const [rows] = await dbConnection.execute(
            "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?);",
            [body._name, body._email, hashPass]
        );
        //check insert already or not
        if (rows.affectedRows !== 1) {
            return res.render('register', {
                error: 'Your registration has failed.'
            });
        }
        //get id and main 

        const [user] = await dbConnection.execute(
            "SELECT * FROM `users` WHERE id IN( SELECT MAX(id) FROM `users` )"
            [body._name, body._email, hashPass]
        );
        
        res.render("register", {
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
};



// // Login Page
exports.loginPage = (req, res, next) => {
    res.render("login");
};

// Login User
exports.login = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    const errors = validationResult(req.body);
    // const {email,password } = req.body;
    const {body} = req;
    if (!errors.isEmpty()) {
        return res.render('login', {
            error: errors.array()[0].msg
        });
    }
    try {

        const [user] = await dbConnection.query('SELECT * FROM users WHERE email=?', [body.email]);
        console.log("find already");
        if (user.length != 1) {
            console.log("error")
            return res.render('login', {
                error: 'Invalid email address.'
                
            });
        }

        const checkPass = await jwt.sign(body.password, user[0].password);

        if(checkPass === false){
            res.render('login', {
                error: 'Invalid Password.'
          });
        }
     
          
        const id =user[0].id;
        const email = user[0].email;
            
            // const token = await jwt.sign({id,email},process.env.SECRETE)
            const token = await encodeToken({id,email})
            const ABC= {};
            ABC.token = token;
            console.log(ABC);

            // res.status(200).header("token", token).send({ "token": token });
            res.status(200).json(ABC);
            // res.redirect('/welcome');       
    }
    catch (e) {
        next(e);
    }

}

//change password
exports.changepasswordPage = (req, res, next) => {
    res.render("changepassword");
};

exports.changepassword = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('changepass', {
            error: errors.array()[0].msg
        });
    }

    try {
        // select email that we input have or not
        const [row] = await dbConnection.execute(
            "SELECT * FROM users WHERE email=?;",
            [body._email]
        );
           // display err when cannot find
        if (row.length != 1) {
            return res.render('changepass', {
                error: 'Invalid email address.'
            });
        }
        //check old password
        const checkPass = await bcrypt.compare(body._password, row[0].password);
        if (checkPass !== true) {
            return res.render('changepass', {
                error: 'Invalid email address.'
            });
        } 
        //compare new password/ confirm pass
        if (body._new_password != body._confirm_password) {
            return res.render('changepass', {
                error: 'Password and confirm password is incorrect.'
            });
        }
        // //compare password
        const hashPass = await bcrypt.hash(body._new_password, 12);
        const [rows] = await dbConnection.execute(
            "UPDATE `users` SET password=?  where email=?",[hashPass,body._email]
        );

        if (rows.affectedRows !== 1) {
            return res.render('changepass', {
                error: 'Your change password has failed.'
            });
        }
        
        res.render("changepass", {
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
};