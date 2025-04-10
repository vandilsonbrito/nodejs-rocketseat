import { hash } from "bcryptjs"
import { GymsRepository } from "repositories/gyms-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym } from "@prisma/client"

interface SearchGymsUseCaseRequest {
    query: string
    page: number
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase { 
    constructor(private gymsRepository: GymsRepository) {}

    async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
        
        const gyms = await this.gymsRepository.searchMany(
            query,
            page
        )

        return {
            gyms,
        }
    
    }
}
