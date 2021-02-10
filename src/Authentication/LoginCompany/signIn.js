const { tokenForUser } = require('../../Library/functions/auth/token/token')
exports.login = function (req, res, next) {
  const tokenSet = tokenForUser(req.user)
  res.status(200).json({ user: req.user, token: tokenSet.access_token, refreshToken: tokenSet.refresh_Token })
}
