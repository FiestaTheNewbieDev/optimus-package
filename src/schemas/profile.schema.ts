import { skillSchema } from '@schemas/skill.schema';
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const FIRST_NAME_MIN_LENGTH = 1;
export const FIRST_NAME_MAX_LENGTH = 64;

export const LAST_NAME_MIN_LENGTH = 1;
export const LAST_NAME_MAX_LENGTH = 64;

export const TITLE_MAX_LENGTH = 128;

export const profileSchema = pgTable('profiles', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),

  firstName: varchar('first_name', { length: FIRST_NAME_MAX_LENGTH }).notNull(),
  lastName: varchar('last_name', { length: LAST_NAME_MAX_LENGTH }).notNull(),
  title: varchar('title', { length: TITLE_MAX_LENGTH }),
  biography: text('biography'),
  birthDate: timestamp('birth_date', { withTimezone: true }),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const LINKEDIN_SLUG_MAX_LENGTH = 64;

export const linkedInProfileSchema = pgTable('linkedin_profiles', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  profileUuid: uuid('profile_uuid')
    .notNull()
    .references(() => profileSchema.uuid, { onDelete: 'cascade' }),

  slug: varchar('slug', { length: LINKEDIN_SLUG_MAX_LENGTH }).notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const GITHUB_USERNAME_MAX_LENGTH = 64;

export const gitHubProfileSchema = pgTable('github_profiles', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  profileUuid: uuid('profile_uuid')
    .notNull()
    .references(() => profileSchema.uuid, { onDelete: 'cascade' }),

  username: varchar('username', {
    length: GITHUB_USERNAME_MAX_LENGTH,
  }).notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const profileSkillsSchema = pgTable(
  'profile_skills',
  {
    profileUuid: uuid('profile_uuid')
      .notNull()
      .references(() => profileSchema.uuid, { onDelete: 'cascade' }),
    skillUuid: uuid('skill_uuid')
      .notNull()
      .references(() => skillSchema.uuid, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.profileUuid, table.skillUuid] })],
);
