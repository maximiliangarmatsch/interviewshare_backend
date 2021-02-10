module.exports = (`
query ($roles :String!) {
  user_role:isa_User_Roles(where: {user_Role: {_eq: $roles}}) {
    id
  }
}
`)
