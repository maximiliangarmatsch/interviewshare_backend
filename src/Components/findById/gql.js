module.exports = (`
    query ($id :uuid ){
        Employer(where: {id: {_eq: $id}}) {
            email
            password
            }
        Candidate(where: {id: {_eq: $id}}) {
            email
            password
            }
        }
`)
