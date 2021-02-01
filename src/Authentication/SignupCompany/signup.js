const { userValidation } = require('./functions/userValidation')
const { companyInsert } = require('./functions/companyInsert')
const { encrypt } = require('../../Components/encrypt')
const { tokenForUser } = require('../token/token')
const { mail } = require('../../Components/email/emailer')
exports.SignUp = (req, res, next) => {
  const {
    email,
    password,
    name,
    role
  } = req.body
  if (!email || !password) {
    res.status(422).json({ error: 'Email or Password not provided' })
  } else {
    userValidation(email, name, vat, (err, present, count) => {
      if (err) {
        res.status(500).json({ error: err.message })
      }
      if (present && count === 3) {
        encrypt(password, (hash) => {
          companyInsert(email, hash, name, address, countryId, city, vat, (err, response) => {
            if (err) {
              res.status(500).json({ error: err.message })
            }
            const tokenSet = tokenForUser(response.id)
            res.status(200).json({ user: response.id, token: tokenSet.token, refreshToken: tokenSet.refreshToken })
            mail(email, 'Welcome To Interview Share App')
          })
        })
      } else {
        res.status(200).json({ error: 'User already active ,Uniqueness Violation' })
      }
    })
  }
}
