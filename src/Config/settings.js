const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  secret: process.env.secret,
  tokenLife: process.env.tokenLife,
  refreshTokenSecret: process.env.refreshTokenSecret,
  refreshTokenLife: process.env.refreshTokenLife,
  smtpHost: process.env.smtpHost,
  smtpPort: process.env.smtpPort,
  smtpAuthUser: process.env.smtpAuthUser,
  smtpAuthPass: process.env.smtpAuthPass
  SENDGRID_API_KEY : process.env.SENDGRID_API_KEY,
}
