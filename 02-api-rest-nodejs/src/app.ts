import fastify from "fastify";

import { transactionsRoutes } from "./routes/transactions";
import cookie from "@fastify/cookie";

export const app = fastify();

app.register(cookie)
// Use the register method to register a plugin which contains all routes with the same path
app.register(transactionsRoutes, {
    prefix: 'transactions',
})