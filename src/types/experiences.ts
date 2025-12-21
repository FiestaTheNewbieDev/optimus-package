import { SkillEntity } from '@/types/skills';
import {
  experienceSchema,
  experienceSkillsSchema,
} from '@schemas/experience.schema';
import { InferSelectModel } from 'drizzle-orm';

export type ExperienceEntity = InferSelectModel<typeof experienceSchema>;

export type ExperienceSkillsEntity = InferSelectModel<
  typeof experienceSkillsSchema
>;

export type ExperienceSkill = {
  uuid: SkillEntity['uuid'];
  label: SkillEntity['label'];
  iconUrl: SkillEntity['iconUrl'];
  associatedAt: ExperienceSkillsEntity['createdAt'];
};

export type Experience = {
  uuid: ExperienceEntity['uuid'];
  profileUuid: ExperienceEntity['profileUuid'];
  title: ExperienceEntity['title'];
  description: ExperienceEntity['description'];
  images: string[];
  startDate: ExperienceEntity['startDate'];
  endDate: ExperienceEntity['endDate'];
  skills: ExperienceSkill[];
  createdAt: ExperienceEntity['createdAt'];
  updatedAt: ExperienceEntity['updatedAt'];
  deletedAt: ExperienceEntity['deletedAt'];
};
