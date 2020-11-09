const signIn = require('./routes/auth/signIn')
const signUp = require('./routes/auth/signUp')
const refreshToken = require('./routes/auth/token')
const logout = require('./routes/auth/logout')
const protectedRoutes = require('./routes/protectedRoutes/protected')
const thirdParty = require('./routes/thirdParty/api')
const pdf = require('./routes/pdf/pdf')
const csv = require('./routes/csv/csv')

module.exports = function (app) {
  protectedRoutes(app)
  signIn(app)
  signUp(app)
  refreshToken(app)
  logout(app)
  thirdParty(app)
  pdf(app)
  csv(app)
}
