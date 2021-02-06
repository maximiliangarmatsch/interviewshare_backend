const router =require('express').Router()
const { verifyUser} = require('../../../Authentication/VerifyUser/verifyUser')

router.get('/confirm/:confirmationCode', verifyUser)
module.exports = router