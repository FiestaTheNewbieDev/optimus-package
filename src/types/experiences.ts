import { AssociatedSkill } from '@/types/skills';
import { ExperienceEntity } from '@entities/experience.entity';
import {
  experienceSchema,
  experienceSkillsSchema,
} from '@schemas/experience.schema';

export type ExperienceSchema = typeof experienceSchema;

export type ExperienceSkillsSchema = typeof experienceSkillsSchema;

export type ExperienceSkill = AssociatedSkill;

export type Experience = {
  uuid: ExperienceEntity['uuid'];
  profileUuid: ExperienceEntity['profile']['uuid'];
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
