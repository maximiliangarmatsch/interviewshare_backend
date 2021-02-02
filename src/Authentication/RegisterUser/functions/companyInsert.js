const axios = require('axios')
const insertMutation = require('../data/companyMutation')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
  companyInsert: async (email, password, name, address, countryId, city, vat, callback) => {
    await axios({
      method: 'POST',
      headers: headerConfig,
      url: endPoint,
      data: {
        query: insertMutation,
        variables: {
          email,
          password,
          name,
          address,
          countryId,
          vat,
          city
        }
      },
      responseType: 'json'
    }).then(
      res => callback(null, res.data.data.isa_User.returning[0])
    ).catch(err => callback(err, null))
  }
}
