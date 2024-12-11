import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import client, { User } from "database";

/*
 ** we can either initialize prismaClient here or just
 ** import it from the database package,
 ** but initializing here is not a good practice reason in `database/index.ts`
 */

const app = new Hono();
const PORT = 3001;

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/ping", async (c) => {
  return c.json({ message: "pong" });
});

app.get("/users", async (c) => {
  const users = await client.user.findMany();
  return c.json(users);
});

app.get("/users/:id", async (c) => {
  const user = await client.user.findUnique({
    where: { id: Number(c.req.param("id")) },
  });
  return c.json(user);
});

app.post("/users", async (c) => {
  const data = await c.req.json();
  const user = await client.user.create({ data: data as User });
  return c.json(user);
});

app.put("/users/:id", async (c) => {
  const data = await c.req.json();
  const user = await client.user.update({
    where: { id: Number(c.req.param("id")) },
    data: data as User,
  });
  return c.json(user);
});

app.delete("/users/:id", async (c) => {
  const user = await client.user.delete({
    where: { id: Number(c.req.param("id")) },
  });
  return c.json(user);
});

serve({ fetch: app.fetch, port: Number(PORT) });
