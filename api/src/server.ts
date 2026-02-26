import { fastify } from "fastify";

const app = fastify()

// 'host' allows the app to be accessed externally (e.g., on services like Rail)
app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
