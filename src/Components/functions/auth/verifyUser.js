const axios = require('axios')
const query = require('../../../Models/queries/FindUserBySecret')
const mutation = require('../../../Models/mutations/verifyUser')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
  getUserIdBySecret: async (secret, callback) => {
    axios({
      method: 'POST',
      headers: headerConfig,
      url: endPoint,
      data: {
        query: query,
        variables: {
          secret
        }
      },
      responseType: 'json'
    })
      .then(res => callback(null, res.data.data.secret[0].id))
      .catch(err => callback(err, null))
  },
  setUserAsVerified: async (id, callback) => {
    axios({
      method: 'POST',
      headers: headerConfig,
      url: endPoint,
      data: {
        query: mutation,
        variables: {
          id
        }
      },
      responseType: 'json'
    }).then(res => callback(res.data.data.verified.returning[0]))
  }
}
