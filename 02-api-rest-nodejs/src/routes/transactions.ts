import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function transactionsRoutes(app: FastifyInstance) {

    app.get('/',{
            preHandler: [checkSessionIdExists]
        }, async (req,) => {

            const { sessionId } = req.cookies;

            const transactions = await knex('transactions')
                .where('session_id', sessionId)
                .select('*')

            return { transactions}
    })

    app.get('/:id',{
            preHandler: [checkSessionIdExists]
        }, async (req) => {
            const getTransactionParamsSchema = z.object({
                id: z.string().uuid()
            })

            const { id } = getTransactionParamsSchema.parse(req.params)
            const { sessionId } = req.cookies;

            const transaction = await knex('transactions')
                .where({
                    session_id: sessionId,
                    id,
                })
                .first()

            return { transaction }
    })

    app.get('/summary',{
            preHandler: [checkSessionIdExists]
        }, async (req,) => {

            const { sessionId } = req.cookies;

            const summary = await knex('transactions')
                .where('session_id', sessionId)
                .sum('amount', { as: 'amount' })
                .first()

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
                maxAge: 60 * 60 * 24 * 7 // 7 days
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