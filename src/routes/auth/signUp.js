const { SignUp: RegisterCompany } = require('../../Authentication/SignupCompany/signup')
const { SignUp: RegisterCandidate } = require('../../Authentication/SignupCandidate/signup')

module.exports = function (app) {
  app.post('/signUp/company', RegisterCompany)
  app.post('/signUp/candidate', RegisterCandidate)
}
