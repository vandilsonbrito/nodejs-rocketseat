import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { RegisterService } from 'services/register'
import { PrismaUsersRepository } from 'repositories/prisma-users-repository'

export async function register (request: FastifyRequest, reply: FastifyReply) {

    const registeredBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registeredBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        // the service who needs the dependency is the one that is going to call the repository => Dependency Inversion
        // then it would be easier to change the repository (change from Prisma to something else for example (TypeORM, MongoDB, etc))
        const registerService = new RegisterService(prismaUsersRepository) 

        await registerService.execute({
            name,
            email,
            password
        })
    }
    catch (error) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}