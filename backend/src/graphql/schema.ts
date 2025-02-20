import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum Urgency {
    NONE_URGENT
    LESS_URGENT
    URGENT
    EMERGENCY
  }

  enum Status {
    OPEN
    RESOLVED
  }

  type MaintenanceRequest {
    id: Int!
    title: String!
    description: String
    status: Status!
    urgency: Urgency!
    createdAt: String!
    resolvedAt: String
    timeToResolve: Float
  }

  type Query {
    requests: [MaintenanceRequest!]!
  }

  type Mutation {
    createRequest(
      title: String!
      urgency: Urgency
      status: Status
      description: String
    ): MaintenanceRequest!
    resolveRequest(id: Int!): MaintenanceRequest!
  }

  type Subscription {
    requestUpdated: MaintenanceRequest!
  }
`;
