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
  app.all('*', (req, res) => {
    const err = new Error('Requested path not found!')
    res.status(404).json({
      code: 404,
      status: 'Path Not Found',
      success: 0,
      detail: err.message
    })
  })
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
      code: err.statusCode,
      status: err.name,
      success: 0,
      detail: err.message,
      stack: err.stack
    })
  })
}
