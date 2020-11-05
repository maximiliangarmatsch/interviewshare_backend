module.exports = (`
query ($email :String ){
    Candidate(where: {email: {_eq: $email}}) {
        id
        password
        }
  } 
`)
