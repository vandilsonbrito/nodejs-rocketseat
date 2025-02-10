import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function transactionsRoutes(app: FastifyInstance) {

    app.get('/', async () => {
        const transactions = await knex('transactions').select('*')

        return { transactions}
    })

    app.get('/:id', async (req) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionParamsSchema.parse(req.params)

        const transaction = await knex('transactions').where('id', id).first()

        return { transaction }
    })

    app.get('/summary', async () => {
        const summary = await knex('transactions').sum('amount', { as: 'amount' }).first()

        return { summary }
    })

    app.post('/', async (req, res) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum((['credit', 'debit']))
        })

        // verify if body params are valid
        const { title, amount, type } = createTransactionBodySchema.parse(req.body)

        let sessionId = req.cookies.sessionId

        if(!sessionId) {
            sessionId = randomUUID()
            res.setCookie('sessionId', sessionId, { 
                path: '/', 
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })
        }

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId
        })

        return res.status(201).send('Transaction created successfully')
    })

}