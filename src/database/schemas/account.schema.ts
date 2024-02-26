import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import * as crypto from 'crypto';
import { role_schema } from './role.schema';
import { relations } from 'drizzle-orm';
import { recipe_schema } from './recipe.schema';

export const account_schema = sqliteTable('accounts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  bio: text('bio').notNull(),
  avatar_url: text('avatar_url'),
  role_id: text('role_id').references(() => role_schema.id),
});

export const account_relations = relations(account_schema, ({ many }) => ({
  recipes: many(recipe_schema),
}));
