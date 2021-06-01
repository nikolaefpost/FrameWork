import { gql } from '@apollo/client';

export const GET_FIRST_FIVE_USERS = gql`
    query {
        queryUser(first: 50) {
            id
            username
            avatar
            status
            active
        }
    }
`;