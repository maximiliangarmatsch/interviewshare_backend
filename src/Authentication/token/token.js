const config = require('../../Config/settings')
const jwt = require('jsonwebtoken')
const tokenList = {}

function tokenForUser (userId) {
  const timeStamp = new Date().getTime()
  const payload = { sub: userId, iat: timeStamp }
  const token = jwt.sign(payload, config.secret, { expiresIn: Math.floor(Date.now() / 1000) + (15), issuer: 'interviewshare.com', audience: toString(userId) })
  const refreshToken = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60), issuer: 'interviewshare.com', audience: toString(userId) })
  const access = {
    token,
    refreshToken
  }
  tokenList[refreshToken] = access

  return access
}
module.exports = {
  tokenForUser: tokenForUser,
  issueToken: function (req, res, next) {
    const user = req.body.userId
    const { refreshToken } = req.body
    const storedRefreshToken = tokenList[refreshToken].refreshToken
    if (storedRefreshToken === refreshToken) {
      jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
        if (err) {
          console.log(err.message)
        }
        if (decoded.sub === user) {
          tokenList[refreshToken] = ''
          const tokenSet = tokenForUser(decoded.sub)
          res.json({ user, token: tokenSet.token, refreshToken: tokenSet.refreshToken })
        } else {
          res.status(403).json({ error: 'Unauthorized Access' })
        }
      })
    } else {
      res.status(403).json({ error: 'Unauthorized Access' })
    }
  }

}
