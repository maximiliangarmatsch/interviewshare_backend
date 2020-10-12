const { gql } = require('@apollo/client');

export const gqlEvent = gql`
    query{
        Candidate{
        email,
        password,
                }
        }
`;
