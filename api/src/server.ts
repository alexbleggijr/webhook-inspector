import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { listWebhooks } from './routes/list-webhooks'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: true, // permite que qualquer endereço acesse nosso backend,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  // credentials: true // if we had authentication, this would allow cookies
  // from the frontend to be sent to the backend (when on the same domain)
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Webhook Inspector API',
      description: 'API for capturing and inspecting hebhook requests.',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(ScalarApiReference, {
  routePrefix: '/docs',
})

app.register(listWebhooks)

// 'host' allows the app to be accessed externally (e.g., on services like Rail)
app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('🔥 HTTP server running on http://localhost:3333')
  console.log('📚 Docs available at http://localhost:3333/docs')
})
