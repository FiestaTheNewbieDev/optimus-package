import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const LABEL_MIN_LENGTH = 4;
export const LABEL_MAX_LENGTH = 64;

export const skillSchema = pgTable('skills', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),

  label: varchar('label', { length: LABEL_MAX_LENGTH }).notNull(),
  iconUrl: text('icon_url'),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
