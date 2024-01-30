import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import * as crypto from 'crypto';
import { relations } from 'drizzle-orm';
import { account_schema } from './account.schema';

export const recipe_schema = sqliteTable('recipes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  image: text('image').notNull(),
  ingredients: text('ingredients').notNull(),
  steps: text('steps').notNull(),
  description: text('description').notNull(),
  rating: int('rating'),
  author_id: text('author_id').notNull(),
});

export const recipe_relations = relations(recipe_schema, ({ one }) => ({
  author: one(account_schema, {
    fields: [recipe_schema.author_id],
    references: [account_schema.id],
  }),
}));
