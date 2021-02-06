module.exports = (`
    mutation Insert_User(
        $name: String!                                
        $email: String!
        $password: String!
        $role: uuid!
    ) {
        insert_isa_User(
            objects: {
                name: $name
                email: $email
                password: $password
                role: $role
            }
        ) {
            returning {
                id,
                secret,
                userType:isa_User_Type{
                    role:user_Role
                  }
            }
        }
    }  
`)
