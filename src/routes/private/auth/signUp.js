const router = require('express').Router()
const { registerUser } = require('../../../Authentication/Register/signup')
const { addRegReqValidation: reqValidation } = require('../../../Middleware/Validation/Register/register.validation')

router.post('/register', reqValidation, registerUser)

module.exports = router
