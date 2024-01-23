import { Injectable } from '@nestjs/common';
import { createClient } from '@libsql/client';
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DrizzleService {
  public readonly db: LibSQLDatabase<Record<string, never>>;

  constructor(private readonly env: ConfigService) {
    const url = env.get('DB_URL');
    const authToken = env.get('DB_TOKEN');
    const client = createClient({
      url,
      authToken,
    });
    this.db = drizzle(client);
  }
}
