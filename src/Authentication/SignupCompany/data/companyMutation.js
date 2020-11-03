export default `
    mutation Insert_Employer(
                                        
        $email: String!
        $password: String!
        $name: String!
        $address: String!
        $countryId: uuid!
        $city: String!
        $vat: String
    ) {
        insert_Employer(
            objects: {
                
                email: $email
                password: $password
                name: $name
                address: $address
                countryId: $countryId
                vat: $vat
                city: $city
            }
        ) {
            returning {
                name
                id
            }
        }
    }

    
`;
