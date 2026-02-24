import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import dotenv from 'dotenv';

dotenv.config();

function assertDatabaseUrl(url: string | undefined): asserts url is string {
  if (typeof url !== 'string') {
    throw new Error('DATABASE_URL is not a string');
  }
}

function createConfig(): ReturnType<typeof defineConfig> {
  assertDatabaseUrl(process.env.DATABASE_URL);

  return {
    clientUrl: process.env.DATABASE_URL,
    entities: ['./dist/entities/**/*.js'],
    entitiesTs: ['./src/entities/**/*.ts'],
    extensions: [Migrator],
    migrations: {
      path: './migrations',
    },
  };
}

export default defineConfig(createConfig());
