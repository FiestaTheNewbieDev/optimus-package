import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

const SCHEMAS_PATH = './src/schemas/index.ts';
const MIGRATIONS_PATH = './src/migrations';

export default defineConfig({
  schema: SCHEMAS_PATH,
  out: MIGRATIONS_PATH,
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT || '5432', 10),
    user: process.env.PG_USER || '',
    password: process.env.PG_PASSWORD || '',
    database: process.env.DB_NAME || '',
    ssl:
      process.env.PG_SSL_MODE === 'true'
        ? { rejectUnauthorized: false }
        : false,
  },
});
