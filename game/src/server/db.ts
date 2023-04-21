import { PrismaClient } from "@prisma/client";

import { env } from "@/env.mjs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    //TODO Re-enable debug
    /* log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      */
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
