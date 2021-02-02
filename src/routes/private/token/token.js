const { issueToken: TokenIssue } = require('../../Authentication/token/token')
module.exports = function (app) {
  app.post('/refreshToken', TokenIssue)
}
