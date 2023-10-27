import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient, User } from "database";

const client = new PrismaClient();
const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
  })
);

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

serve(app);
