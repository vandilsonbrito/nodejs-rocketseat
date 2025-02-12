import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";
import cookie from "@fastify/cookie";

const app = fastify();

app.register(cookie)
// Use the register method to register a plugin which contains all routes with the same path
app.register(transactionsRoutes, {
    prefix: 'transactions',
})

app.listen({
    port: env.PORT
}).then(() => {
    console.log(`Server is running on PORT: ${env.PORT}`);
})