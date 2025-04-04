import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterService } from 'services/register'
import { PrismaUsersRepository } from 'repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from 'services/errors/user-already-exists-error'

export async function register (request: FastifyRequest, reply: FastifyReply) {

    const registeredBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registeredBodySchema.parse(request.body)

    try {
        // the service who needs the dependency is the one that is going to call the repository => Dependency Inversion
        // then it would be easier to change the repository (change from Prisma to something else for example (TypeORM, MongoDB, etc))
        const usersRepository = new PrismaUsersRepository()
        const registerService = new RegisterService(usersRepository) 

        await registerService.execute({
            name,
            email,
            password
        })
    }
    catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }
        return reply.status(500).send()
    }

    return reply.status(201).send()
}