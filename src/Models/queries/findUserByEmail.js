module.exports = (`
query ($email :String!){
      email:isa_User(where: {email: {_eq: $email}}) {
        id,
        email,
        secret
      }
}`)
