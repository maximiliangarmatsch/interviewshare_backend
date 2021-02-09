const router =require('express').Router()
const { verifyUser} = require('../../../Authentication/VerifyUser/verifyUser')
const {resetRequest,resetPassword} = require('../../../Authentication/ResetPassword/resetPassword')

router.get('/confirm/:confirmationCode', verifyUser)
router.post('/resetRequest',resetRequest) 
router.post('/resetPassword/:code',resetPassword) 
module.exports = router