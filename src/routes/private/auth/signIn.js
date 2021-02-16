require('../../../Middleware/passport')
const router = require('express').Router()
const passport = require('passport')
const { login } = require('../../../Authentication/Login/signIn')

const isUserPresent = passport.authenticate('user', { session: false })
router.post('/login', isUserPresent, login)

module.exports = router
