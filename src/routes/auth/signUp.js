const express = require('express')
const router = express.Router()
const {SignUp :RegisterCompany} = require('../../Authentication/SignupCompany/signup')
const {SignUp :RegisterCandidate} = require('../../Authentication/SignupCandidate/signup')

router.post('/candidate', RegisterCandidate);
router.post('/company',RegisterCompany);