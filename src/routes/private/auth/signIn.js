const { signIn: CompanySignIn } = require('../../../Authentication/LoginCompany/signIn')
const { signIn: CandidateSignIn } = require('../../../Authentication/LoginCandidate/signIn')
require('../../../Middleware/passport')
const passport = require('passport')

const isCandidatePresent = passport.authenticate('candidate', { session: false })
const isCompanyPresent = passport.authenticate('company', { session: false })

module.exports = function (app) {
  app.post('/signIn/company', isCompanyPresent, CompanySignIn)
  app.post('/signIn/candidate', isCandidatePresent, CandidateSignIn)
}
