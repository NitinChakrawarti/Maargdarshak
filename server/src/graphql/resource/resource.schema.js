import { gql } from "apollo-server-express";


const resourceTypeDefs = gql`
  type Resource {
    id: ID!
    title: String!
    description: String
    createdAt: String
    updatedAt: String
    domain: [String]
    rating: Float
    reviews: [String]
    banner: String
    resource: [String]
    mentorId: ID
    mentorname: String
    studentsEnrolled: Int
  }

  type Query {
    resources: [Resource]
    resource(id: ID!): Resource
  }
`;

export default resourceTypeDefs;