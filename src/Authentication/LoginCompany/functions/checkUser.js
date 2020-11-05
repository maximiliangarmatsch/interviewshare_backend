const axios = require('axios')
const queryGql = require('../data/companyQuery')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
  checkUser: async function ajaxSearchAxios (email, callback) {
    const searchResults = []
    const $email = email
    await axios({
      method: 'POST',
      headers: headerConfig,
      url: endPoint,
      data: {
        query: queryGql,
        variables: { email: $email }
      },
      responseType: 'json'
    }).then(
      res => {
        for (const data in res.data.data) {
          for (const result in res.data.data[data]) {
            searchResults.push(res.data.data[data][result])
          }
        }
        if (searchResults[0] === undefined) {
          return callback(new Error('User not Found'))
        }
        return callback(null, searchResults)
      }
    ).catch(err => callback(new Error('Unable to connect to services ,Internet Down')))
  }
}
