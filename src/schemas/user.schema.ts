import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

/**
 * @deprecated
 */
export const USERNAME_MIN_LENGTH = 3;
/**
 * @deprecated
 */
export const USERNAME_MAX_LENGTH = 32;
/**
 * @deprecated
 */
export const USERNAME_REGEX = /^[a-zA-Z0-9._\-']+$/;

/**
 * @deprecated
 */
export const EMAIL_MAX_LENGTH = 320;

/**
 * @deprecated
 */
export const ROLES = ['user', 'admin', 'owner'] as const;

/**
 * @deprecated
 */
export const roleEnum = pgEnum('role', ROLES);

/**
 * @deprecated
 */
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
