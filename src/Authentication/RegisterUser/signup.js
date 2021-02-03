const { isUserPresent } = require('../../Components/functions/auth/isUserPresent')
const {getRoleId} =require('../../Components/functions/auth/getIdByRole')
const { userInsert } = require('../../Components/functions/auth/userInsert')
const { encrypt } = require('../../Components/functions/res/encrypt')
const { tokenForUser } = require('../../Components/functions/auth/token/token')
const { emailConfirmation } = require('../../Components/functions/email/emailer')

exports.registerUser = async (req, res, next) => {
  const session = req.sessionID
  console.log(session)
  const {
    email,
    password,
    name,
    role
  } = req.body
  if (!email || !password) {
    res.status(422).json({ error: 'Please Pass all the required fields' })
    return;
  } else {
    isUserPresent(email, (err, present) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return;
      }
      if (!present) {
        getRoleId(role, (err, id) => {
          if (err) {
            res.status(500).json({ error: err.message })
            return;
          }
        encrypt(password, (hash) => {
          userInsert(name, email, hash, id, (err, response) => {
            if (err) {
              res.status(500).json({ error: err.message })
              return;
            }
            const tokenSet = tokenForUser(response.id,session)
            emailConfirmation(response.name, response.email, response.secret)
            res.status(200).json({ user: response.id, token: tokenSet.access_token, refreshToken: tokenSet.refresh_Token })
          })
        })})
      } else {
        res.status(200).json({ error: 'User already active ,Uniqueness Violation' })
        return;
      }
    })
  }
}
  