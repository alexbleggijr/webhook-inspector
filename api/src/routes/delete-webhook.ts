import { eq } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db'
import { webhooks } from '@/db/schema'

// exporting a constant allows us to type the entire function.
// if we exported only the function directly, we would only be able to type the parameters.
export const deleteWebhook: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/api/webhooks/:id',
    // route configuration
    {
      // route validation and documentation
      schema: {
        summary: 'Delete a specific webhook by ID',
        tags: ['Webhooks'],
        // query parameters
        params: z.object({
          // maximum number of items to be returned
          id: z.uuidv7(),
        }),
        response: {
          204: z.void(),
          404: z.object({ message: z.string() }),
        },
      },
    },
    // request: provides access to request body data, headers, and query parameters
    // reply: sends a response and allows changing the HTTP status
    async (request, reply) => {
      const { id } = request.params

      const result = await db
        .delete(webhooks)
        .where(eq(webhooks.id, id))
        .returning()

      if (result.length === 0) {
        return reply.status(404).send({ message: 'Webhook not found.' })
      }

      // every database query returns an array
      return reply.status(204).send()
    },
  )
}
