import { PrismaClient, Status, Urgency } from "@prisma/client";
import pubsub from "./pubsub";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    requests: async () => {
      return await prisma.maintenanceRequest.findMany();
    },
  },
  Mutation: {
    createRequest: async (
      _: any,
      {
        title,
        urgency,
        status,
        description,
      }: {
        title: string;
        urgency: Urgency;
        status?: Status;
        description?: string;
      }
    ) => {
      try {
        const createdRequest = await prisma.maintenanceRequest.create({
          data: {
            title,
            urgency,
            status: status || "OPEN",
            description,
            createdAt: new Date(),
          },
        });

        await pubsub.publish("REQUEST_UPDATED", {
          requestUpdated: createdRequest,
        });

        return createdRequest;
      } catch (error) {
        console.debug("ERROR CREATING REQUEST", error);
        throw error;
      }
    },
    resolveRequest: async (_: any, { id }: { id: number }) => {
      const currentRequest = await prisma.maintenanceRequest.findUnique({
        where: { id },
      });

      if (!currentRequest) {
        throw new Error("Request not found");
      }

      const timeToResolve = Math.floor(
        (new Date().getTime() - currentRequest.createdAt.getTime()) / 1000
      );

      try {
        const updatedRequest = await prisma.maintenanceRequest.update({
          where: { id },
          data: {
            status: "RESOLVED",
            resolvedAt: new Date(),
            timeToResolve:
              Math.round((timeToResolve / (60 * 60 * 24)) * 10) / 10, // calculate to a day,
          },
        });

        await pubsub.publish("REQUEST_UPDATED", {
          requestUpdated: updatedRequest,
        });

        return updatedRequest;
      } catch (error) {
        console.debug("ERROR RESOLVING REQUEST", error);
        throw error;
      }
    },
  },
  Subscription: {
    requestUpdated: {
      subscribe: () => pubsub.asyncIterableIterator(["REQUEST_UPDATED"]),
    },
  },
};
