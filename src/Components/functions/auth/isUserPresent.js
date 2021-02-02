const axios = require('axios')
const query = require('../../../Models/queries/findUserByEmail')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
  isUserPresent: async function ajaxSearchAxios (email, callback) {
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
     res => {
       let isPresent = true
       if(res.data.data.email[0] == null){
           isPresent = false
       }else { 
           isPresent = true
       }
       return callback(null, isPresent)
     }
   ).catch(err => callback(err.message, null))
 }
}