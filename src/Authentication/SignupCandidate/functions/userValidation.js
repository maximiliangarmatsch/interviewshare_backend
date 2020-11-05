const axios = require('axios')
const queryGql = require('../data/validationQuery')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
  userValidation: async function ajaxSearchAxios (email, callback) {
    await axios({
      method: 'POST',
      headers: headerConfig,
      url: endPoint,
      data: {
        query: queryGql,
        variables: {
          email
        }
      },
      responseType: 'json'
    }).then(
      res => {
        let valid = false
        for (const data in res.data.data) {
          if (res.data.data[data][0] == null) {
            valid = true
          } else {
            valid = false
          }
        }

        return callback(null, valid)
      }
    ).catch(err => callback(err, null))
  }
}
