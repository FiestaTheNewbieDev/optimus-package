/* eslint-disable @typescript-eslint/no-deprecated */

import { profileSchema } from '@schemas/profile.schema';
import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

/**
 * @deprecated
 */
export const FIRST_NAME_MIN_LENGTH = 1;
/**
 * @deprecated
 */
export const FIRST_NAME_MAX_LENGTH = 64;

/**
 * @deprecated
 */
export const LAST_NAME_MIN_LENGTH = 1;
/**
 * @deprecated
 */
export const LAST_NAME_MAX_LENGTH = 64;

/**
 * @deprecated
 */
export const ORGANIZATION_NAME_MIN_LENGTH = 1;
/**
 * @deprecated
 */
export const ORGANIZATION_NAME_MAX_LENGTH = 128;

/**
 * @deprecated
 */
export const EMAIL_MAX_LENGTH = 320;

/**
 * @deprecated
 */
export const PHONE_NUMBER_MAX_LENGTH = 32;

/**
 * @deprecated
 */
export const LANG_MAX_LENGTH = 5;

/**
 * @deprecated
 */
export const contactMessageSchema = pgTable(
  'contact_messages',
  {
    uuid: uuid('uuid').primaryKey().defaultRandom(),
    profileUuid: uuid('profile_uuid')
      .notNull()
      .references(() => profileSchema.uuid, { onDelete: 'cascade' }),

    firstName: varchar('first_name', {
      length: FIRST_NAME_MAX_LENGTH,
    }).notNull(),
    lastName: varchar('last_name', { length: LAST_NAME_MAX_LENGTH }).notNull(),
    organizationName: varchar('organization_name', {
      length: ORGANIZATION_NAME_MAX_LENGTH,
    }),
    email: varchar('email', { length: EMAIL_MAX_LENGTH }).notNull(),
    phoneNumber: varchar('phone_number', { length: PHONE_NUMBER_MAX_LENGTH }),
    message: text('message').notNull(),

    // METADATA
    lang: varchar('lang', { length: LANG_MAX_LENGTH }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('email_idx').on(table.email),
    index('phone_number_idx').on(table.phoneNumber),
    index('created_at_idx').on(table.createdAt),
  ],
);
