const route = require("express").Router();
const userController = require("../controllers/user-controller");      //user functions
const path = require("path");
const passport = require("passport");     //User Authentication
const { isAuthenticated, isNotAuthenticated } = require("./helper-functions");

route.use('/user', isAuthenticated, require("./user-route").route);      // every user gets authenticated then directed to /user
route.use('/products', isAuthenticated, require("./products-route").route);

route.get('/', (req, res)=>{                                             //Start Page
     res.sendFile(path.join(__dirname, "../views/html/start.html"));
});

route.get('/login', isNotAuthenticated, (req, res) => {                 //User shld not be already authenticated(Logged in)
    res.sendFile(path.join(__dirname, "../views/html/login.html"));
});

route.get('/register', isNotAuthenticated, (req, res) => {              //User shld not be already authenticated(Logged in)
    res.sendFile(path.join(__dirname, "../views/html/register.html"));
});

route.post('/login', passport.authenticate('local', { successRedirect: '/user', failureRedirect: '/register' }));   //Authenticates User to Log in

route.post('/register', (req, res) => {
    if(req.body.password !== req.body.confirmPassword)
        return res.json({ 'error': 'Passwords do not match.' });
    userController.addUser(req.body).then(() => {               // passing req.body->user details to save it in db
        return res.redirect('/login');
    });
});

module.exports = { route };
