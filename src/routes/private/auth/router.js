// const signIn = require('./signIn')
const {registerUser} = require('../../../Authentication/RegisterUser/signup')
// const refreshToken = require('../token/token')
// const logout = require('./logout')
// const authMiddleware = require('../middleware/auth')
module.exports = function (app) {
  app.post('/oauth2/v2/register',registerUser)
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