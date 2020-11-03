import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const apolloClient = new ApolloClient({
    link: createUploadLink({
        uri: 'https://known-bass-99.hasura.app/v1/graphql',
        headers: {
            'x-hasura-admin-secret': 'CODERCONSULTING'
        }
    }),
    cache: new InMemoryCache({
        addTypename: false // to remove unnecessary __typename field
    })
});

export default apolloClient;
