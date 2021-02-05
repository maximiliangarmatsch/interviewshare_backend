const authRouter = require('./private/auth/auth.router')
// const protectedRoutes = require('../protectedRoutes/protected')
// const thirdParty = require('./public/thirdParty/api')
// const pdf = require('./pdf/pdf')
// const csv = require('./csv/csv')
// const upload = require('./upload/upload')

module.exports = function (app) {
  authRouter(app)
  // protectedRoutes(app)
  // thirdParty(app)
  // pdf(app)
  // csv(app)
  // upload(app)
}
