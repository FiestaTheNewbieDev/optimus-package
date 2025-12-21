import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 32;
export const USERNAME_REGEX = /^[a-zA-Z0-9._\-']+$/;

export const EMAIL_MAX_LENGTH = 320;

export const ROLES = ['user', 'admin', 'owner'] as const;

export const roleEnum = pgEnum('role', ROLES);

export const userSchema = pgTable('users', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),

  username: varchar('username', { length: USERNAME_MAX_LENGTH })
    .notNull()
    .unique(),
  email: varchar('email', { length: EMAIL_MAX_LENGTH }).notNull().unique(),
  password: text('password').notNull(),

  role: roleEnum('role').notNull().default('user'),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
