module.exports = (`
    mutation Insert_User(
        $name: String!                                
        $email: String!
        $password: String!
        $role: uuid!
    ) {
        isa_User(
            objects: {
                name: $name
                email: $email
                password: $password
                role: $role
            }
        ) {
            returning {
                name
                id
            }
        }
    }  
`)
