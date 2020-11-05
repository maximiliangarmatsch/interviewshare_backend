const { tokenForUser } = require('../token/token')
exports.signIn = function (req, res, next) {
  const tokenSet = tokenForUser(req.user)
  res.status(200).json({ user: req.user, token: tokenSet.token, refreshToken: tokenSet.refreshToken })
}
