import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const FIRST_NAME_MIN_LENGTH = 1;
export const FIRST_NAME_MAX_LENGTH = 64;

export const LAST_NAME_MIN_LENGTH = 1;
export const LAST_NAME_MAX_LENGTH = 64;

export const ORGANIZATION_NAME_MIN_LENGTH = 1;
export const ORGANIZATION_NAME_MAX_LENGTH = 128;

export const EMAIL_MAX_LENGTH = 320;

export const PHONE_NUMBER_MAX_LENGTH = 32;

export const contactMessageSchema = pgTable('contact_messages', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),

  firstName: varchar('first_name', { length: FIRST_NAME_MAX_LENGTH }).notNull(),
  lastName: varchar('last_name', { length: LAST_NAME_MAX_LENGTH }).notNull(),
  organizationName: varchar('organization_name', {
    length: ORGANIZATION_NAME_MAX_LENGTH,
  }),
  email: varchar('email', { length: EMAIL_MAX_LENGTH }).notNull(),
  phoneNumber: varchar('phone_number', { length: PHONE_NUMBER_MAX_LENGTH }),
  message: text('message').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
