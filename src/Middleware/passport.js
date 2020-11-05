const passport = require('passport')
const config = require('../Config/settings')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
const { checkUser: checkCandidate } = require('../Authentication/LoginCandidate/functions/checkUser')
const { checkUser: checkCompany } = require('../Authentication/LoginCompany/functions/checkUser')
const { compare } = require('../Components/comparePassword')
const { findById } = require('../Components/findById/findById')
// Local options
const localOptions = {
  usernameField: 'email'
}
// Candidate Local Login Strategy
const candidateLogin = new LocalStrategy(localOptions, (email, password, done) => {
  checkCandidate(email, (err, data) => {
    if (err && data == null) {
      return done(err, false)
    }
    if (err) {
      return done(err, false)
    }
    if (data[0] === undefined || data[0] === null) {
      return done(null, false)
    }
    const hash = data[0].password
    compare(password, hash, (err, isMatch) => {
      if (err) {
        return done(err)
      }
      if (!isMatch) {
        return done(null, false)
      }
      const { id } = data[0]
      return done(null, id)
    })
  })
})
// Company Local Login Strategy
const companyLogin = new LocalStrategy(localOptions, (email, password, done) => {
  checkCompany(email, (err, data) => {
    if (err && data == null) {
      return done(err, false)
    }
    if (err) {
      return done(err, false)
    }
    if (data[0] === undefined || data[0] === null) {
      return done(null, false)
    }
    const hash = data[0].password
    compare(password, hash, (err, isMatch) => {
      if (err) { return done(err) }
      if (!isMatch) {
        return done(null, false)
      }
      const { id } = data[0]
      return done(null, id)
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
passport.use('candidate', candidateLogin)
passport.use('company', companyLogin)
