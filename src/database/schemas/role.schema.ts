import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import * as crypto from 'crypto';

export const role_schema = sqliteTable('roles', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull().unique(),
});
