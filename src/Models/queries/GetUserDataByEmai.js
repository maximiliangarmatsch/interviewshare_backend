module.exports = (`
query ($email :String!){
      user:isa_User(where: {email: {_eq: $email}}) {
        id,
        password
      }
}`)
