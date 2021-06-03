const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Session = require("express-session");
const passport = require("passport");
require("./auth/passport-local.js");        // run authentication file (passport-local.js)

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.static(path.join(__dirname, "views")));  //fetches css and other static files

app.use(Session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require("./routes/index-route").route);   //-> login page   //Handling all the Routes

mongoose.connect("mongodb://localhost:27017/ecom", { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(5555,function(){
  console.log("Server on port 5555");
});
