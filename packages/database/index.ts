import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

declare global {
  var prismaGlobal: PrismaClientSingleton | undefined;
}

/**
 * @initialize @param globalThis used during the development because of hot reloading in nextJS.
 * If we don't do that, it will always initialize a new PrismaClient
 * everytime it reloads, then we will have too may active prisma clients.
 * In production, we don't have this issue
 */

const client = globalThis.prismaGlobal ?? prismaClientSingleton();

// in order to avoid creating too many prisma instances in development.
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = client;
}

export { client as default };
export * from "@prisma/client";
