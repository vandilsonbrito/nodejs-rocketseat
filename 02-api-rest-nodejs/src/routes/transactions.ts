import { FastifyInstance } from "fastify";
import { knex } from "../database";
import crypto from "node:crypto";

export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/test', async () => {
        const transactions = await knex('transactions').insert({
            id: crypto.randomUUID(),
            title: 'Transação de Teste',
            amount: 1000
        }).returning('*')
    
        return transactions;
    })
}