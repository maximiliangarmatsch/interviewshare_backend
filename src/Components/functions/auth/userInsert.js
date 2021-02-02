const axios = require('axios')
const insertMutation = require('../../../Models/mutations/registerUser')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
  userInsert: async (name, email, password, role, callback) => {
    axios({
      method: 'POST',
      headers: headerConfig,
      url: endPoint,
      data: {
        query: insertMutation,
        variables: {
          name,
          email,
          password,
          role
        }
      },
      responseType: 'json'
    }).then(
      res => callback( null , res.data.data.insert_isa_User.returning[0])
    ).catch(err => callback(err, null))
  }
}
