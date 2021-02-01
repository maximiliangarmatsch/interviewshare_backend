const { SENDGRID_API_KEY } = require('../../../Config/settings')
const isaMail = require('@sendgrid/mail')
isaMail.setApiKey(SENDGRID_API_KEY)
const sendMail = async (msg) => {
  try {
    await isaMail.send(msg)
  } catch (error) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
  }
}
module.exports = {
  register: function (userEmail) {
    const msg = {
      to: userEmail,
      from: '<b>Interview Share App</b><no-reply@interviewshare.de>', // Use the email address or domain you verified above
      subject: 'Welcome To Interview Share App',
      template_id: 'd-a62eeb33d2b04d148417e22d30da5495'
    }
    sendMail(msg)
  },
  passwordReset: function () {
    const msg = {
      to: 'umer1807F@aptechsite.net',
      from: 'Interview Share<no-reply@interviewshare.de>', // Use the email address or domain you verified above
      subject: 'Welcome To Interview Share App',
      template_id: 'd-a62eeb33d2b04d148417e22d30da5495'
    }
    sendMail(msg)
  },
  emailConfirmation: function () {
    const msg = {
      to: 'umer1807F@aptechsite.net',
      from: 'Interview Share<no-reply@interviewshare.de>', // Use the email address or domain you verified above
      subject: 'Welcome To Interview Share App',
      template_id: 'd-a62eeb33d2b04d148417e22d30da5495'
    }
    sendMail(msg)
  }
}
