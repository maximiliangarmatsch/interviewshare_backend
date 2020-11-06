const signIn = require('./auth/signIn')
const signUp = require('./auth/signUp')
const refreshToken = require('./auth/token')
const logout = require('./auth/logout')
const protectedRoutes = require('./protectedRoutes/protected')
const thirdParty = require('./thirdParty/api')
const pdf = require('./pdf/pdf')
const csv = require('./csv/csv')

module.exports = function (app) {
  protectedRoutes(app)
  signIn(app)
  signUp(app)
  refreshToken(app)
  logout(app)
  // thirdParty(app)
  // pdf(app)
  // csv(app)
}
