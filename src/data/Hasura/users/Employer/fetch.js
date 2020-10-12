import { gql } from '@apollo/client';

export const gqlEvent = gql`
    query{
        Employer{
        email,
        password,
                }
        }
`;
