const mongoose = require("mongoose");
const User = mongoose.model(require("../models/user-model").MODEL_NAME);

const passport = require("passport");
const LocalStrategy = require("passport-local");    //strategy used

const fields = { usernameField: 'email' }

passport.use(new LocalStrategy(fields, (email, password, done) => {
    User.findOne({ email: email }).exec().then((user) => {     //find user in our database
        if(!user || user.password !== password)     // if user doesnt exist or wrong password
            done(null, false);
        else
            done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).exec().then((user) => done(null, user));
});
