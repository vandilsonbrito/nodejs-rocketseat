import { hash } from "bcryptjs"
import { UsersRepository } from "repositories/users-repository"

interface RegisterRequest {
    name: string
    email: string
    password: string
}

// Dependency Inversion Principle
export class RegisterService { 
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterRequest) {
        const password_hash = await hash(password, 6)
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('Email already exists')
        } 
        
        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    
    }
}
