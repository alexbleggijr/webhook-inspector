import { integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

// UUID v7 stores the timestamp of when it was created,
// allowing us to implement cursor-based pagination
// this table will store all incoming requests
export const webhooks = pgTable('webhooks', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  method: text().notNull(),
  pathname: text().notNull(),
  ip: text().notNull(),
  statusCode: integer().notNull().default(200),
  contentType: text(),
  contentLength: integer(),
  queryParams: jsonb().$type<Record<string, string>>(),
  headers: jsonb().$type<Record<string, string>>().notNull(),
  body: text(),
  createdAt: timestamp().notNull().defaultNow(),
})
