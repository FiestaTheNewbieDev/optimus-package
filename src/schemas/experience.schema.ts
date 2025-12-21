import { profileSchema } from '@schemas/profile.schema';
import { skillSchema } from '@schemas/skill.schema';
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const EXPERIENCE_TITLE_MIN_LENGTH = 3;
export const EXPERIENCE_TITLE_MAX_LENGTH = 255;

export const EXPERIENCE_DESCRIPTION_MIN_LENGTH = 8;

export const experienceSchema = pgTable('experiences', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  profileUuid: uuid('profile_uuid')
    .notNull()
    .references(() => profileSchema.uuid, { onDelete: 'cascade' }),

  title: varchar('title', { length: EXPERIENCE_TITLE_MAX_LENGTH }).notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export const experienceSkillsSchema = pgTable(
  'experience_skills',
  {
    experienceUuid: uuid('experience_uuid')
      .notNull()
      .references(() => experienceSchema.uuid, { onDelete: 'cascade' }),
    skillUuid: uuid('skill_uuid')
      .notNull()
      .references(() => skillSchema.uuid, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.experienceUuid, table.skillUuid] })],
);
