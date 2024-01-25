import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/database/schemas/*',
  out: './src/database/drizzle/generated',
  driver: 'libsql',
  dbCredentials: {
    url: process.env.DB_URL,
  },
} satisfies Config;
