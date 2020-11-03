const axios = require('axios');
const mutation = require('../data/candidateMutation')
const headerConfig = { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' }
const endPoint = 'https://known-bass-99.hasura.app/v1/graphql'
module.exports = {
    candidateInsert: async (name ,email, password, jobTitle, callback) => {
        await axios({
            method: 'POST',
            headers: headerConfig,
            url: endPoint,
            data: {
                query: mutation ,
                variables: {
                    name,
                    email,
                    password,
                    jobTitle
                }
            },
            responseType: 'json'
        }).then(
            res => callback(null, res.data.data.insert_Candidate.returning[0])
        ).catch(err => callback(err, null))
    }
}