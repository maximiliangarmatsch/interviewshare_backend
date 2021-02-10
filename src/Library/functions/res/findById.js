const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
const gql = require('../../../Models/queries/findUserById')
const axios = require('axios')

module.exports = {
  findById: async function ajaxSearchAxios (id, callback) {
    const searchResults = []
    const $id = id
    await axios({
      method: 'POST',
      headers: headerConfig,
      url: endPoint,
      data: {
        query: gql,
        variables: { id: $id }
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
          return callback(new Error('User Not Found'))
        }
        return callback(null, searchResults)
      }
    ).catch(err => callback(err, null))
  }
}
