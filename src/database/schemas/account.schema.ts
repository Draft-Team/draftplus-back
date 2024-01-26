import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import * as crypto from 'crypto';
import { role } from './role.schema';

export const account_schema = sqliteTable('accounts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  bio: text('bio').notNull(),
  avatar_url: text('avatar_url'),
  roleId: text('role_id').references(() => role.id),
});
