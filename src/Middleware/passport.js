const passport = require('passport');
const config = require('../Config/settings');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const { checkUser, findById, compare } = require('../models/usersModel');
// Local options
const localOptions = {
    usernameField: 'email'
};
// Create Local Strategy
const localLogin = new LocalStrategy(localOptions, ((email, password, done) => {
    // Verify this email and Password ,call done with User
    // if it is the correct email and password ,
    // otherwise ,call done with false
    checkUser(email, (err, data) => {
        if (err && data == null) { return done(err, false); }
        if (err) { return done(err, false); }
        if (data[0] == undefined || data[0] == null) {
            // res.status(403).json({error:"User Not Found"})
            return done(null, false);
        }
        // if exists compare passwords
        const hash = data[0].password;
        compare(password, hash, (err, isMatch) => {
            if (err) { return done(err); }
            if (!isMatch) {
                return done(null, false);
            }
            const { id } = data[0];
            return done(null, id);
        });
    });
}));

// Setups options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, ((payload, done) => {
// see if the user ID in the payload exist in our database
// if it does, call 'done with that  other
// otherwise, call done without a user object
    findById(payload.sub, (err, user) => {
        if (err) { return done(err, false); }

        if (user[0] == undefined || user[0] == null) {
            return done(null, false);
            //     res.status(403).json({error:"User Not Found"})
        }
        done(null, user[0]);
    });
}));

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
