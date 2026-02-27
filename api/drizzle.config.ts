import { defineConfig } from 'drizzle-kit'
import { env } from '@/env'

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  // folder where migration files will be generated (SQL to create the tables)
  out: './src/db/migrations',
  // file where schema definitions are located
  schema: './src/db/schema/index.ts',
  // table naming format
  casing: 'snake_case',
})
