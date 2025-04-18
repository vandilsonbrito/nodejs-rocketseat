import 'fastify'

declare module 'fastify' {
    interface FastifyReply {
      setCookie(name: string, value: string, options: any): this
    }
}