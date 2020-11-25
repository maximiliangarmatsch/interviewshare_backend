const { userValidation } = require('./functions/userValidation')
const { candidateInsert } = require('./functions/candidateInsert')
const { encrypt } = require('../../Components/encrypt')
const { tokenForUser } = require('../token/token')
const { mail } = require('../../Components/email/emailer')
exports.SignUp = (req, res, next) => {
  const {
    name,
    email,
    password,
    jobTitle
  } = req.body
  if (!email || !password) {
    res.status(422).json({ error: 'Email or Password not provided' })
  } else {
    userValidation(email, (err, present) => {
      if (err) {
        res.status(500).json({ error: err.message })
      }
      if (present) {
        encrypt(password, (hash) => {
          candidateInsert(name, email, hash, jobTitle, (err, response) => {
            if (err) {
              res.status(500).json({ error: err.message })
            }
            const tokenSet = tokenForUser(response.id)
            res.status(200).json({ user: response.id, token: tokenSet.token, refreshToken: tokenSet.refreshToken })
            mail(email, 'Welcome To Interview Share App', 'register')
          })
        })
      } else {
        res.status(200).json({ error: 'User already active ,Uniqueness Violation' })
      }
    })
  }
}
