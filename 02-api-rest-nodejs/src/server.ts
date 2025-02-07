import fastify from "fastify";
import { knex } from "./database";
import crypto from "node:crypto";
import { env } from "./env";

const app = fastify();

app.get('/test', async () => {
    const transactions = await knex('transactions').insert({
        id: crypto.randomUUID(),
        title: 'Transação de Teste',
        amount: 1000
    }).returning('*')

    return transactions;
})

app.listen({
    port: env.PORT
}).then(() => {
    console.log(`Server is running on PORT: 5000`);
})