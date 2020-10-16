const passport = require('passport')
const config = require('../settings/settings');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {checkUser,findById ,compare} = require('../models/usersModel');
const LocalStrategy = require('passport-local');
//Local options
const localOptions = { 
    usernameField : 'email',
}
//Create Local Strategy
const localLogin = new LocalStrategy( localOptions , function (email, password, done){
    //Verify this email and Password ,call done with User
    //if it is the correct email and password ,
    // otherwise ,call done with false
    checkUser(email,(err ,data )=>{
        if(err) {return done (err ,false);}
        if(data[0] == undefined || data[0] == null) {
            // res.status(403).json({error:"User Not Found"})
            return done(null ,false);
        }
        else {
          //if exists compare passwords
          var hash = data[0].password;
          compare(password ,hash ,function (err ,isMatch){
              if (err) {return done(err);}
              if (!isMatch){
                  return done(null ,false)
                }else {
                    const id = data[0].id
                    return done (null ,id)
                }
          })
        }
      });
    
})






//Setups options for JWT Strategy
const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: config.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions ,function (payload ,done){
//see if the user ID in the payload exist in our database
//if it does, call 'done with that  other
//otherwise, call done without a user object
    console.log(payload.sub)
    findById(payload.sub ,function (err ,user){
        // if (err ) {return done(err, false);}
        console.log(user)
        if(user[0] == undefined || user[0] == null) {
            return done(null ,false);
            // res.status(403).json({error:"User Not Found"})
        }else {
            done(null ,user[0])
        }
    });

});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);