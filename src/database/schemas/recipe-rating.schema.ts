import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import * as crypto from 'crypto';
import { recipe_schema } from './recipe.schema';
import { account_schema } from './account.schema';

export const recipe_rating_schema = sqliteTable('recipe_rating', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  rate: int('rate').notNull(),
  recipe_id: text('recipe_id')
    .notNull()
    .references(() => recipe_schema.id),
  account_id: text('account_id')
    .notNull()
    .references(() => account_schema.id),
});
