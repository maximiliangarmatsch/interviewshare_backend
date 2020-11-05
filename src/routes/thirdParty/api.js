
const { PORT } = require('../../Config/settings')

module.exports = function (app) {
  app.get('/v1', (req, res, next) => res.status(200).json({ message: 'Welcome to Interview Share API', envVars: PORT }))
}
