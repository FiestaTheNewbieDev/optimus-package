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
import { SLUG_MAX_LENGTH as SKILL_SLUG_MAX_LENGTH } from './skill.schema';

export const PROJECT_TITLE_MIN_LENGTH = 3;
export const PROJECT_TITLE_MAX_LENGTH = 255;

export const PROJECT_DESCRIPTION_MIN_LENGTH = 8;

export const projectSchema = pgTable('projects', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  profileUuid: uuid('profile_uuid')
    .notNull()
    .references(() => profileSchema.uuid, { onDelete: 'cascade' }),

  title: varchar('title', { length: PROJECT_TITLE_MAX_LENGTH }).notNull(),
  description: text('description').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export const projectSkillsSchema = pgTable(
  'project_skills',
  {
    projectUuid: uuid('project_uuid')
      .notNull()
      .references(() => projectSchema.uuid, { onDelete: 'cascade' }),
    skillSlug: varchar('skill_slug', { length: SKILL_SLUG_MAX_LENGTH })
      .notNull()
      .references(() => skillSchema.slug, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.projectUuid, table.skillSlug] })],
);
