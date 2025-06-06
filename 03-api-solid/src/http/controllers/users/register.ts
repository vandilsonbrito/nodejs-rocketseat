import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

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
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
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