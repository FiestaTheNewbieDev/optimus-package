import { AssociatedSkill } from '@/types/skills';
import {
  experienceSchema,
  experienceSkillsSchema,
} from '@schemas/experience.schema';
import { InferSelectModel } from 'drizzle-orm';

export type ExperienceEntity = InferSelectModel<typeof experienceSchema>;

export type ExperienceSkillsEntity = InferSelectModel<
  typeof experienceSkillsSchema
>;

export type ExperienceSkill = AssociatedSkill;

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
