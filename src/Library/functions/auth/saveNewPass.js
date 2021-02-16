const axios = require('axios')
const insertMutation = require('../../../Models/mutations/changePassword')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
  saveNewPass: async (id, password, secret, callback) => {
    axios({
      method: 'POST',
      headers: headerConfig,
      url: endPoint,
      data: {
        query: insertMutation,
        variables: {
          id, 
          password,
          secret
                }
      },
      responseType: 'json'
    }).then(res => {
        const saved = res.data.data.changePassword.affected_rows
        if (saved == 1) {
          callback(null, true)
        } else {
          callback(null, false)
        }
      }

    ).catch(err => callback(err, null))
  }
}
