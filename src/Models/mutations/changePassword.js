module.exports =(`mutation( 
    $id: uuid!                                
    $secret: uuid!
    $password: String!) {
        changePassword:update_isa_User(where: {id: {_eq: "$id"}, secret: {_eq: "$secret"}}, _set: {password: "$password"}) {
          affected_rows
        }
      }      
    `)