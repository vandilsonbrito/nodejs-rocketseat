import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)

      if(!tasks) {
        return res.writeHead(404).end('Tarefas não encontradas');
      }

      return res.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
        if (!req.body) {
            return res.writeHead(400).end('Corpo da requisição inválido ou ausente');
        }
      
        const { title, description } = req.body;
    
        if (!title || !description) {
            return res.writeHead(400).end('Campos "title" e "description" são obrigatórios');
        }

        const now = new Date();

        const task = {
            id: randomUUID(),
            title,
            description,
            created_at: now,
            completed_at: null,
            updated_at: now,
        }

        database.insert('tasks', task)

        return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
        const { id } = req.params
        if (!req.body) {
            return res.writeHead(400).end('Corpo da requisição inválido ou ausente');
        }
        const { title, description } = req.body;

        if (!title || !description) {
            return res.writeHead(400).end('É necessário preencher pelo menos um dos campos "title" ou "description"');
        }

        const tasks = database.select('tasks');
        const task = tasks.find(task => task.id === id);
        if (!task) {
            return res.writeHead(404).end('Tarefa não encontrada');
        }
    
        if (!title && !description) {
            return res.writeHead(400).end('Um ou mais campos obrigatórios não foram preenchidos');
        } 

        if(title) task.title = title;
        if(description) task.description = description;
        task.updated_at = new Date();

        database.update('tasks', id, task)

        return res.writeHead(204).end('Tarefa criada')
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
        const { id } = req.params;

        const tasks = database.select('tasks');
        const task = tasks.find(task => task.id === id);

        const now = new Date();

        if(!task) {
            return res.writeHead(400).end('Tarefa não encontrada');
        }
        if(task) {
            task.completed_at = task.completed_at ? null : now;
            task.updated_at = now;
        }

        database.update('tasks', id, task)

        return res.writeHead(204).end('Tarefa atualizada com sucesso')
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
        const { id } = req.params
        
        const tasks = database.select('tasks');
        const task = tasks.find(task => task.id === id);
        if(!task) {
            return res.writeHead(400).end('Tarefa não encontrada');
        }

        database.delete('tasks', id)

        return res.writeHead(204).end()
    }
  }
]