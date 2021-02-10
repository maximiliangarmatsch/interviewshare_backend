const passport = require('passport')
const config = require('../Config/settings')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
const { checkUser } = require('../Library/functions/auth/getUserByEmail')
const { compare } = require('../Library/functions/res/compare')
// const { findById } = require('../Components/findById/findById')

const localOptions = {
  usernameField: 'email'
}
const userLogin = new LocalStrategy(localOptions, (email, password, done) => {
  checkUser(email, (err, user) => {
    if (err || user == null || user === undefined) {
      return done(err, false)
    }
    if (user === undefined || user === null) {
      return done(null, false)
    }
    const id  = user.id
    const hash = user.password
    compare(password, hash, (err, isMatch) => {
      if (err) { return done(err) }
      if (!isMatch) {
        return done(null, false)
      }else {
        return done(null, id)
      }
    })
  })
})

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log(payload.sub)
  findById(payload.sub, (err, user) => {
    if (err) { return done(err, false) }

    if (user[0] === undefined || user[0] === null) {
      return done(null, false)
      //     res.status(403).json({error:"User Not Found"})
    }
    done(null, user[0])
  })
})

passport.use('jwt', jwtLogin)
passport.use('user', userLogin)
