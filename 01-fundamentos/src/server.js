import http from 'http';
import { Database } from './database.js';
import { json } from './middlewares/json.js';
import { randomUUID } from 'crypto';

// - HTTP
// - Método HTTP
// - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Alterar/atualizar um recurso no back-end
// PATCH => Alterar/atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso no back-end

// Stateful (estado em memoria) - Stateless (sem memoria de estado)

// Cabeçalhos (Requisição/Resposta) => Metadados

// HTTP Response Status Code
// 100 - 199 - Informational
// 200 - 299 - Success
// 300 - 399 - Redirection
// 400 - 499 - Client Error
// 500 - 599 - Server Error

const database = new Database();

const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    await json(req, res);

    if(method === 'GET' && url === '/users') {

        const users = database.select('users');

        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body;
    
        const user = {
            id: randomUUID(),
            name,
            email,
        };
    
        database.insert('users', user);
    
        return res.writeHead(201).end();
    }
    return res.writeHead(404).end();
})

server.listen(3333);

