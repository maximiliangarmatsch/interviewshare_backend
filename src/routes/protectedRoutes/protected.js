require('../../Middleware/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res, next) {
    res.send({ hi: 'there' })
  })
}
