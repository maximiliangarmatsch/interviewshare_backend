const registerRouter = require('./signUp')
const otherRouter = require('./rest.router')
module.exports = function (app) {
  app.use('/oauth2/v2/', registerRouter)
  app.use('/api/auth/', otherRouter)
  // signIn(app)
  // refreshToken(app)
  // logout(app)
}
