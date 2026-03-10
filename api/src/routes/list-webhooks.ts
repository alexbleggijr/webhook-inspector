import { desc, lt } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db'
import { webhooks } from '@/db/schema'

// exporting a constant allows us to type the entire function.
// if we exported only the function directly, we would only be able to type the parameters.
export const listWebhooks: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/api/webhooks',
    // route configuration
    {
      // route validation and documentation
      schema: {
        summary: 'List webhooks',
        tags: ['Webhooks'],
        // query parameters
        querystring: z.object({
          // maximum number of items to be returned
          limit: z.coerce.number().min(1).max(100).default(20),
          // offset-based
          // [1, 2, 3, 4, 5] // db table
          // OFFSET 3 LIMIT 2
          // returns [4, 5]
          // OFFSET pula [1, 2, 3] porém mesmo assim os carrega
          // listas muito grandes ou paginação via scroll infinito trabalhamos com 'cursor-based' invés de 'offset-based'
          //
          // cursor-based
          // [1, 2, 3, 4, 5] // db table
          // LIMIT 2
          // CURSOR 5
          // SELECT * FROM webhooks WHERE id > 3 LIMIT 2
          // returns [4, 5]
          cursor: z.string().optional(), // cursor é opcional porque a primeira página não mostra paginação, não tem registro anterior
        }),
        response: {
          200: z.object({
            webhooks: z.array(
              createSelectSchema(webhooks).pick({
                id: true,
                method: true,
                pathname: true,
                createdAt: true,
              }), // com o pick retornamos só o que queremos do banco
            ),
            nextCursor: z.string().nullable(), // nullable pois quando estivermos na ultima página, não teremos mais um cursor
          }),
        },
      },
    },
    // request: provides access to request body data, headers, and query parameters
    // reply: sends a response and allows changing the HTTP status
    async (request, reply) => {
      const { limit, cursor } = request.query

      const result = await db
        .select({
          id: webhooks.id,
          method: webhooks.method,
          pathname: webhooks.pathname,
          createdAt: webhooks.createdAt,
        })
        .from(webhooks)
        .where(cursor ? lt(webhooks.id, cursor) : undefined) // SE 'cursor' ENTÃO 'liste webhooks' ONDE o 'id é lower than (webhooks.id, cursor)' SENAO indefinido
        .orderBy(desc(webhooks.id))
        .limit(limit + 1) // se o ultimo registro não exisitir, quer dizer que não temos mais páginas

      // se a quantidade de resultados é maior do que o limite solicitado pelo usuario
      const hasMore = result.length > limit
      const items = hasMore ? result.slice(0, limit) : result
      const nextCursor = hasMore ? items[items.length - 1].id : null

      return reply.send({
        webhooks: items,
        nextCursor,
      })
    },
  )
}
