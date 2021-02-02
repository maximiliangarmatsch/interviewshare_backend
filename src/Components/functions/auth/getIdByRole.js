const axios = require('axios')
const query = require('../../../Models/queries/FindRoleIdByRole')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
  getRoleId: async (role, callback) => {
    const roles = role.toLowerCase()
   axios({
    method: 'POST',
    headers: headerConfig,
    url: endPoint,
    data: {
      query: query,
      variables: {
        roles
      }
    },
    responseType: 'json'
  }).then(
    res => callback(null, res.data.data.user_role[0].id )

  ).catch(err => callback(err, null))
}}
