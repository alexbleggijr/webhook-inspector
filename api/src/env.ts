import { z } from 'zod'

// validação das variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url(),
})

export const env = envSchema.parse(process.env)
