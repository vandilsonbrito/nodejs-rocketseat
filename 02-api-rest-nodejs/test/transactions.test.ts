import { expect, it, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { describe } from "node:test";
import { execSync } from "child_process";

describe('Transactions routes', () => {
    
    // Await fot the application to be ready | when fastify is finished to regiter all the plugins
    beforeAll( async() => {
        await app.ready();
    })
    
    // Removes the application from the memory
    afterAll( async() => {
        await app.close();
    })

    // Reset the database every time a test is executed because is necessary to have the database in a clean state
    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all');
        execSync('npm run knex migrate:latest');
    })
    
    it("should be possible to create a new transaction", async () => {
        const response = await request(app.server).post("/transactions").send({
            title: "New transaction",
            amount: 5000,
            type: "credit"
        })
    
        expect(response.statusCode).toEqual(201);
    }) 

    it("should be possible to list all transactions", async () => {
        // To get access to the cookies it is necessary to create a new transaction again because it cannot access
        // the data from another test
        const createTransactionResponse = await request(app.server).post("/transactions").send({
            title: "New transaction",
            amount: 5000,
            type: "credit"
        })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const lisTransactionsResponse = await request(app.server)
            .get("/transactions")
            .set('Cookie', cookies as string[])
            .expect(200)

        expect(lisTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000
            })
        ])
    })

    it('should be possible to return a specific transaction', async () => {
        const createTransactionResponse = await request(app.server).post("/transactions").send({
            title: "New transaction",
            amount: 5000,
            type: "credit"
        })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get("/transactions")
            .set('Cookie', cookies as string[])
            .expect(200)
            
        const transactionId = listTransactionsResponse.body.transactions[0].id

        const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies as string[])
            .expect(200)

        expect(getTransactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000
            })
        )
        
    })

    it("should be possible to get the summary", async () => {
        const createTransactionResponse = await request(app.server).post("/transactions").send({
            title: "New transaction",
            amount: 5000,
            type: "credit"
        })

        const cookies = createTransactionResponse.get('Set-Cookie')
        // Create a new transaction as a debit transaction to test the summary
        await request(app.server)
            .post("/transactions")
            .set('Cookie', cookies as string[])
            .send({
            title: "New transaction",
            amount: 2000,
            type: "debit"
        })

        const lisTransactionsResponse = await request(app.server)
            .get("/transactions/summary")
            .set('Cookie', cookies as string[])
            .expect(200)

        expect(lisTransactionsResponse.body.summary).toEqual(
            expect.objectContaining({
                amount: 3000
            })
        )
    })
})
