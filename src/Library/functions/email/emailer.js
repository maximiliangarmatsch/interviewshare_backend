const { SENDGRID_API_KEY } = require('../../../Config/settings')

const sgMail = require('@sendgrid/mail')
const domain = 'https://isa-backend-server.herokuapp.com/'

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async (msg) => {
  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports = {
  welcomeEmail: (userEmail) => {
    const msg = {
      to: userEmail,
      from: 'no-reply@interviewshare.de',
      subject: 'Welcome To Interview Share App',
      template_id: 'd-a62eeb33d2b04d148417e22d30da5495'
    }
    sendMail(msg)
  },
  emailConfirmation: (name, email, confirmationCode) => {
    const msg = {
      to: email.toString(),
      from: 'no-reply@interviewshare.de', // Use the email address or domain you verified above
      subject: 'Email Confirmation Interview Share',
      html: `<center>
              <h1><strong>Greeting From Interview Share</strong></h1>
              <h2>Hello ${name}</h2>
              <p>Thank you for signing up. Please confirm your email by clicking on the following link to start getting close to your dream job</p>
              <a href=http://localhost:4000/api/auth/confirm/${confirmationCode}> Click here</a>
           </center>`

    }
    sendMail(msg)
  },
  passwordResetEmail: (email, id, secret) => {
    const code = id.toString() + '*/-ISA-@21*' + secret.toString()
    const msg = {
      to: email.toString(),
      from: 'no-reply@interviewshare.de', // Use the email address or domain you verified above
      subject: 'Email Confirmation Interview Share',
      html: `<center>
              <h1><strong>You Requested To ResetPassword</strong></h1>
              
              <p>Click the link down below to reset your password</p>
              <a href=http://localhost:4000/api/auth/resetPassword/${code}> Click here</a>
           </center>`
    }
    sendMail(msg)
  }
}
