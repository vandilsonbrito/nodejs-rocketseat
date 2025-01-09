import http from 'http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

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

const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    await json(req, res);

   const route = routes.find(route => {
        return route.method === method && route.path === url;
   });

   if(route) {
        return route.handler(req, res);
   }

    return res.writeHead(404).end();
})

server.listen(3333);

