require('./src/Middleware/passport')
const passport = require('passport')
const signIn =require('./auth/signIn')
const signUp =require('./auth/signUp')
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false })

module.exports = function (app) {
  // Protected  Routes through middleware
  app.get('/', requireAuth, function (req, res, next) {
    res.send({ hi: 'there' })
  })

  // Authentication  Routes with Middleware
  app.post('/signIn', requireSignIn, signIn)
  app.post('/signUp', signUp)
  app.post('/issueToken', Authentication.issueToken)
  app.get('/logout', Authentication.logout)
  // Utils Routes
  app.get('/pdf', Pdf.create)
}