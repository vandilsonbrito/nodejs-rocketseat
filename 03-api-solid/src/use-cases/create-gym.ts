import { hash } from "bcryptjs"
import { GymsRepository } from "repositories/gyms-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym } from "@prisma/client"

interface CreateGymUseCaseRequest {
    title: string
    description?: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase { 
    constructor(private gymsRepository: GymsRepository) {}

    async execute({ title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        
        const gym = await this.gymsRepository.create({
            title,
            description: description ?? '',
            phone: phone ?? '',
            latitude,
            longitude
        })

        return {
            gym,
        }
    
    }
}
