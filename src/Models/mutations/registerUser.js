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
                name,
                email,
                secret
            }
        }
    }  
`)
