const axios = require('axios')
const query = require('../../../Models/queries/FindUserByEmail')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
  getUserId: (email, callback) => {
    axios({
      method: 'POST',
      headers: headerConfig,
      url: endPoint,
      data: {
        query: query,
        variables: {
          email
        }
      },
      responseType: 'json'
    }).then(
      res => callback(null, res.data.data.email[0])

    ).catch(err => callback(err, null))
  }
}
