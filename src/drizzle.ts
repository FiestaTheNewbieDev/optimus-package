import * as schema from '@schemas/index';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export type DrizzleClient = ReturnType<typeof drizzle>;

export function createDrizzleClient(config: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: boolean;
}): DrizzleClient {
  const pool: Pool = new Pool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    ssl: config.ssl ? { rejectUnauthorized: false } : false,
  });

  return drizzle(pool, {
    schema,
  });
}
