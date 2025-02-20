import { gql } from "@apollo/client";

export type Urgency = "NONE_URGENT" | "LESS_URGENT" | "URGENT" | "EMERGENCY";
export type Status = "OPEN" | "RESOLVED";

export const GET_REQUESTS = gql`
  query GetRequests {
    requests {
      id
      title
      status
      urgency
      createdAt
      resolvedAt
      timeToResolve
    }
  }
`;

export const REQUEST_UPDATED = gql`
  subscription RequestUpdated {
    requestUpdated {
      id
      title
      status
      urgency
      createdAt
      resolvedAt
      timeToResolve
    }
  }
`;

export const RESOLVE_REQUEST = gql`
  mutation ResolveRequest($id: Int!) {
    resolveRequest(id: $id) {
      id
      title
      status
      urgency
      resolvedAt
      timeToResolve
    }
  }
`;

export const CREATE_REQUEST = gql`
  mutation CreateRequest(
    $title: String!
    $status: Status
    $description: String
    $urgency: Urgency!
  ) {
    createRequest(
      title: $title
      status: $status
      description: $description
      urgency: $urgency
    ) {
      id
      title
      description
      status
      urgency
      resolvedAt
      createdAt
      timeToResolve
    }
  }
`;
