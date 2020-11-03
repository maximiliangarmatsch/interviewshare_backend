export default `
    mutation Insert_Candidate(
        $name: String!                                
        $email: String!
        $password: String!
        $jobTitle: String!
    ) {
        insert_Candidate(
            objects: {
                name: $name
                email: $email
                password: $password
                jobTitle: $jobTitle
            }
        ) {
            returning {
                name
                id
            }
        }
    }

    
`;
