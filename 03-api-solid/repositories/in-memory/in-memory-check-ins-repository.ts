import { Prisma, CheckIn } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "repositories/check-ins-repositories";

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date) {
        const checkInOnSameDate = this.items.find(
            (checkIn) =>
                checkIn.user_id === userId &&
                checkIn.created_at.getFullYear() === date.getFullYear() &&
                checkIn.created_at.getMonth() === date.getMonth() &&
                checkIn.created_at.getDate() === date.getDate(),
        )

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }
    
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }
    
        this.items.push(checkIn)
    
        return checkIn
    }
    
}
