const nodemailer = require('nodemailer')
const config = require('../../Config/settings')
const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  auth: {
    user: config.smtpAuthUser,
    pass: config.smtpAuthPass
  }
})

module.exports = {
  mail: async function (recipient, subject) {
    const mailOptions = {
      from: 'umer1807F@aptechsite.net',
      to: recipient,
      subject: subject,
      text: 'IT really works'

    }

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err.message)
      } else {
        console.log(data)
        console.log('Email')
      }
    })
  }

}
