import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "repositories/check-ins-repositories";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface FetchUserCheckinHistoryUseCaseRequest {
    userId: string
    page: number
}

interface FetchUserCheckinHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckinHistoryUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}

    async execute({ userId, page }: FetchUserCheckinHistoryUseCaseRequest): Promise<FetchUserCheckinHistoryUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        if (!checkIns) {
            throw new ResourceNotFoundError()
        }

        return {
            checkIns
        }
    }
 }