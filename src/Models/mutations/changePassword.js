module.exports = (`
mutation($id: uuid!,$password: String!,$secret: uuid!) {
    changePassword:update_isa_User(
      _set: {password: $password},
      where: {
              id: {_eq: $id},
              secret: {_eq: $secret}
            })
            {
            affected_rows
            }
  }`)
