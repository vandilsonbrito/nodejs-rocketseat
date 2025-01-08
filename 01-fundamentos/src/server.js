import http from 'http';

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

const users = [];

const server = http.createServer((req, res) => {

    const { method, url } = req;

    if(method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'doe@example.com'
        })
        return res.writeHead(201).end();
    }
    return res.writeHead(404).end();
})

server.listen(3333);

