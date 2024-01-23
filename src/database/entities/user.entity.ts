import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import * as crypto from 'crypto';

export const user = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text('user_name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  bio: text('bio').notNull(),
  profilePic: text('profile_pic'),
});
