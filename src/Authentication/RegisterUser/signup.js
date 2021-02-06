const { isUserPresent } = require('../../Library/functions/auth/isUserPresent')
const { getRoleId } = require('../../Library/functions/auth/getIdByRole')
const { userInsert } = require('../../Library/functions/auth/userInsert')
const { encrypt } = require('../../Library/functions/res/encrypt')
const { tokenForUser } = require('../../Library/functions/auth/token/token')
const { emailConfirmation } = require('../../Library/functions/email/emailer')

exports.registerUser = async (req, res, next) => {
  const sessionId = req.sessionID
  const {
    email,
    password,
    name,
    role
  } = req.body
  if (!email || !password) {
    res.status(422).json({ error: 'Please Pass all the required fields' })
  } else {
    isUserPresent(email, (err, present) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      if (!present) {
        getRoleId(role, (err, id) => {
          if (err) {
            res.status(500).json({ error: err.message })
            return
          }
          encrypt(password, (hash) => {
            userInsert(name, email, hash, id, (err, data) => {
              if (err) {
                res.status(500).json({ error: err.message })
                return
              }
              const tokenSet = tokenForUser(data.id, sessionId, data.userType.role)
              emailConfirmation(name, email, data.secret)
              res.status(200).json({ user: data.id, token: tokenSet.access_token, refreshToken: tokenSet.refresh_Token })
            })
          })
        })
      } else {
        res.status(200).json({ error: 'User already active ,Uniqueness Violation' })
      }
    })
  }
}
