import { Injectable } from '@nestjs/common';
import { createClient } from '@libsql/client';
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import { ConfigService } from '@nestjs/config';
import * as schema from '../schemas';

type Schema = typeof schema;

@Injectable()
export class DrizzleService {
  public readonly db: LibSQLDatabase<
    Record<keyof Schema, Schema[keyof Schema]>
  >;

  constructor(private readonly env: ConfigService) {
    const url = this.env.get('DB_URL');
    const authToken = this.env.get('DB_TOKEN');
    const client = createClient({
      url,
      authToken,
    });
    this.db = drizzle(client, {
      schema: { ...schema },
    });
  }
}
