import { Gym, Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";
import { FindManyNearbyParams, GymsRepository } from "repositories/gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
    findById(id: string){
        const gym = prisma.gym.findUnique({
            where: {
                id
            }
        })

        return gym
    }
    searchMany(query: string, page: number) {
        const gyms = prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gyms
    }
    findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
        const gyms = prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }
    create(data: Prisma.GymCreateInput) {
        const gym = prisma.gym.create({
            data
        })

        return gym
    }
    
}