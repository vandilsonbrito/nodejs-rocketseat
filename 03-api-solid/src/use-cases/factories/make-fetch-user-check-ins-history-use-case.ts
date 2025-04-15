import { PrismaCheckInsRepository } from "repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckinHistoryUseCase } from "@/use-cases/fetch-user-check-ins-history"

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository
    const useCase = new FetchUserCheckinHistoryUseCase(checkInsRepository) 

    return useCase
}