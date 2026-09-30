import { PrismaClient } from "../generated/prisma/client"; // Path from your schema output
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 1. Set up the connection pool
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL
});

// 2. Create the adapter (Required for Prisma 7)
const adapter = new PrismaPg(pool);

// 3. Create the singleton instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;