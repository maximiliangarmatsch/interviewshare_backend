module.exports = (`
query ($email :String ){
  Employer(where: {email: {_eq: $email}}) {
    id
    password
    }
  }
`)
