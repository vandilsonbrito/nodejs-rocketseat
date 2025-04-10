import { CheckInsRepository } from "repositories/check-ins-repositories";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}

    async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        if (!checkInsCount) {
            throw new ResourceNotFoundError()
        }

        return {
            checkInsCount
        }
    }
 }