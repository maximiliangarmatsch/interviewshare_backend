// const signIn = require('./signIn')
const { registerUser: RegisterUser } = require('../../../Authentication/RegisterUser/signup')
const { verifyUser: VerifyUser } = require('../../../Authentication/VerifyUser/verifyUser')
// const refreshToken = require('../token/token')
// const logout = require('./logout')
// const authMiddleware = require('../middleware/auth')
module.exports = function (app) {
  app.post('/oauth2/v2/register', RegisterUser)
  app.get('/api/auth/confirm/:confirmationCode', VerifyUser)
  // app.post('/oauth2/v2/register',authMiddleware,function (req, res, next){
  //  const {grantType} =req.body
  //  switch(grantType){

  //  }
  // })
  // signIn(app)
  // signUp(app)
  // refreshToken(app)
  // logout(app)
}
