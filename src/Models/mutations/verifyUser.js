module.exports = (`
mutation ($id: uuid!) {
  verified:update_isa_User(_set: {is_verified: true}, where: {id: {_eq: $id}, is_verified: {_eq: false}}) {
    returning {
      is_verified,
      email
    }
  } 
}
`)
