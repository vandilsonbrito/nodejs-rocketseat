import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register service', () => {
    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const { user } = await registerService.execute({
            name: 'John Doe',
            email: 'email@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456', 
            user.password_hash
        )
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterService(usersRepository)
    
        const email = 'johndoe@example.com'
    
        await registerUseCase.execute({
          name: 'John Doe',
          email,
          password: '123456',
        })
    
        await expect(() =>
          registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
          }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
      })
})
