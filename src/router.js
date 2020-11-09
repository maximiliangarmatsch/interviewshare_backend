const signIn = require('./Routes/auth/signIn')
const signUp = require('./Routes/auth/signUp')
const refreshToken = require('./Routes/auth/token')
const logout = require('./Routes/auth/logout')
const protectedRoutes = require('./Routes/protectedRoutes/protected')
const thirdParty = require('./Routes/thirdParty/api')
const pdf = require('./Routes/pdf/pdf')
const csv = require('./Routes/csv/csv')

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
