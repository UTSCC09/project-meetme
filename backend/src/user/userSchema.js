import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        me: User!
        user(email: String!): User
        eventsOwned(email: String!, page: Int): [Event!]
    }

    type User {
        _id: ID!
        username: String!
        email: String!
    }
`;
