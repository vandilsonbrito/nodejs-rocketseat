// @types/fastify-jwt.d.ts
import '@fastify/jwt'

declare module 'fastify' {

  interface FastifyRequest {
    jwtVerify(): Promise<void>
    user: {
      sub: string
    }
  }

  interface FastifyReply {
    jwtSign(payload: object, options?: object): Promise<string>
  }
}