const {SENDGRID_API_KEY} = require('../../../Config/settings')

// const sgMail = require('@sendgrid/mail')
// const domain = 'https://isa-backend-server.herokuapp.com/';
console.log(SENDGRID_API_KEY)
// sgMail.setApiKey(config.sendGridApiKey)

// const sendMail = async (msg) => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   }
// };
// // sendMail({to: 'umer1807F@aptechsite.net',
// //       from: '<b>Interview Share App</b><no-reply@interviewshare.de>', // Use the email address or domain you verified above
// //       subject: 'Welcome To Interview Share App',
// //       template_id: 'd-a62eeb33d2b04d148417e22d30da5495'})
// module.exports = {
//   register: function (userEmail) {
//     const msg = {
//       to: userEmail,
//       from: '<b>Interview Share App</b><no-reply@interviewshare.de>', // Use the email address or domain you verified above
//       subject: 'Welcome To Interview Share App',
//       template_id: 'd-a62eeb33d2b04d148417e22d30da5495'
//     }
//     sendMail(msg)
//   },
//   passwordReset: function () {
//     const msg = {
//       to: 'umer1807F@aptechsite.net',
//       from: 'Interview Share<no-reply@interviewshare.de>', // Use the email address or domain you verified above
//       subject: 'Welcome To Interview Share App',
//       template_id: 'd-a62eeb33d2b04d148417e22d30da5495'
//     }
//     sendMail(msg)
//   },
//   emailConfirmation: function (name, email, confirmationCode) {
//     const msg = {
//       to: email.toString(),
//       from: 'no-reply@interviewshare.de', // Use the email address or domain you verified above
//       subject: 'Email Confirmation Interview Share',
//       html:`<center>
//               <h1><strong>Greeting From Interview Share</strong></h1>
//               <h2>Hello ${name}</h2>
//               <p>Thank you for signing up. Please confirm your email by clicking on the following link to start getting close to your dream job</p>
//               <a href=http://localhost:4000/api/auth/confirm/${confirmationCode}> Click here</a>
//            </center>`,
      
//     }
//     sendMail(msg)
//   }
// }
