import { Status, Urgency } from "@/services/graphql";

export interface RequestObject {
  id: number;
  title: string;
  description: string;
  status: string;
  urgency: string;
  createdAt: string;
  resolvedAt: string;
  timeToResolve: string;
}

export interface RequestObjectPayload {
  title: string;
  status: Status;
  urgency: Urgency;
  description: string;
}
