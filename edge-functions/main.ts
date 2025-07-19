import { Hono } from 'hono'
import { logger } from "hono/logger";
import { bearerAuth } from "hono/bearer-auth";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { requestId } from 'hono/request-id'
import MedicineRouter from "./routes/medicine/index.ts";

const TOKEN = Deno.env.get("API_KEY_BEARER_TOKEN") as string;

const functionName = "health";
const app = new Hono().basePath(`/${functionName}`);

app.use("*", csrf());
app.use("*", requestId());
app.use("*", logger());

app.use("*", cors());

app.use("*", secureHeaders());

app.use("/medicine/*", bearerAuth({ token: TOKEN }));

app.route("/medicine", MedicineRouter);

app.notFound((c) => {
  return c.json({ message: "not found" }, 404);
});

Deno.serve({ port: 5555 },app.fetch)