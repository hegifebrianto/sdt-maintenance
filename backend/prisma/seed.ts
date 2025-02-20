// prisma/seed.ts
import { PrismaClient, Status, Urgency } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.maintenanceRequest.createMany({
        data: [
            {
                title: "Fix Leaking Pipe",
                status: Status.OPEN,
                urgency: Urgency.EMERGENCY,
                description: "Urgent pipe repair needed in the kitchen",
            },
            {
                title: "Update Software",
                status: Status.RESOLVED,
                urgency: Urgency.LESS_URGENT,
                resolvedAt: new Date("2025-02-19T09:00:00"),
                timeToResolve: 18.5,
                description: "Update the accounting software to the latest version",
            },
            {
                title: "Routine Checkup",
                status: Status.OPEN,
                urgency: Urgency.NONE_URGENT,
                description: "Monthly maintenance checkup for equipment",
            },
        ],
    });

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
