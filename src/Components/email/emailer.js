const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'mail.smtp2go.com',
  port: 2525,
  auth: {
    user: 'MuhammadUmerFarooqi',
    pass: 'knnZYIrN6JMN'
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
