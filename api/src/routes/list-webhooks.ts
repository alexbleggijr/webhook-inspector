import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

// exporting a constant allows us to type the entire function.
// If we exported only the function directly, we would only be able to type the parameters.
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
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              method: z.string(),
            }),
          ),
        },
      },
    },
    // request: provides access to request body data, headers, and query parameters
    // reply: sends a response and allows changing the HTTP status
    async (request, reply) => {
      const { limit } = request.query

      return [
        {
          id: '123',
          method: 'POST',
        },
      ]
    },
  )
}
