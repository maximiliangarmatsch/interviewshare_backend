module.exports =(`
mutation ($id: uuid!) {
    verified:update_isa_User(where: {id: {_eq: $id},, is_verified: {_eq: false}}, _set: {is_verified: true}){
      returning{
        is_verified
      }
    }  
}
`)