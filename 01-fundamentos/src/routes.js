import { Database } from './database.js';
import { randomUUID } from 'crypto';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: async (req, res) => {
            const users = database.select('users');

            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: async (req, res) => {
            const { name, email } = req.body;

            const user = {
                id: randomUUID(),
                name,
                email,
            };

            database.insert('users', user);

            res.writeHead(201).end();
        }   
    },
    {
        method: 'DELETE',
        path: '/users',
        handler: async (req, res) => {
            

            res.writeHead(201).end();
        }   
    }
]