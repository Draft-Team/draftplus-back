import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import * as crypto from 'crypto';
import { recipe_schema } from './recipe.schema';
import { account_schema } from './account.schema';
import { relations } from 'drizzle-orm';

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

export const recipe_rating_relations = relations(
  recipe_rating_schema,
  ({ one }) => ({
    account: one(account_schema, {
      fields: [recipe_rating_schema.id],
      references: [account_schema.id],
    }),
    recipe: one(recipe_schema, {
      fields: [recipe_rating_schema.id],
      references: [recipe_schema.id],
    }),
  }),
);
