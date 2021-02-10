const config = require('../../../../Config/settings')
const jwt = require('jsonwebtoken')
const tokenList = {}

function tokenForUser (userId, sessionId, role) {
  // const timeStamp = new Date().getTime()
  const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60)
  const issuer = 'interviewshare.de'
  const audience = userId.toString() + sessionId.toString()
  const payload = {
    sub: userId,
    iss: issuer,
    aud: audience,
    nonce: sessionId,
    exp: expiresIn,
    "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["anonymous","admin","candidate", "company"],
    "x-hasura-default-role": role,
    "x-hasura-user-id": userId.toString()
  }}
  const access_token = jwt.sign(payload, config.secret)
  const refresh_Token = jwt.sign(payload, config.refreshTokenSecret)
  const access = {
    access_token,
    refresh_Token
  }
  tokenList[refresh_Token] = access

  return access
}
module.exports = {
  tokenForUser: tokenForUser
  // issueToken: function (req, res, next) {
  //   const user = req.body.userId
  //   const { refresh_Token } = req.body
  //   const storedrefreshToken = tokenList[refresh_Token].refresh_Token
  //   if (storedrefreshToken === refresh_Token) {
  //     jwt.verify(refresh_Token, config.refresh_TokenSecret, (err, decoded) => {
  //       if (err) {
  //         console.log(err.message)
  //       }
  //       if (decoded.sub === user) {
  //         tokenList[refresh_Token] = ''
  //         const tokenSet = tokenForUser(decoded.sub)
  //         res.json({ user, token: tokenSet.access_token, refresh_Token: tokenSet.refresh_Token })
  //       } else {
  //         res.status(403).json({ error: 'Unauthorized Access' })
  //       }
  //     })
  //   } else {
  //     res.status(403).json({ error: 'Unauthorized Access' })
  //   }
  // }

}
