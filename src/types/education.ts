import { AssociatedSkill } from '@/types/skills';
import {
  educationSchema,
  educationSkillsSchema,
} from '@schemas/education.schema';
import { InferSelectModel } from 'drizzle-orm';

export type EducationEntity = InferSelectModel<typeof educationSchema>;

export type EducationSkillsEntity = InferSelectModel<
  typeof educationSkillsSchema
>;

export type EducationSkill = AssociatedSkill;

export type Education = {
  uuid: EducationEntity['uuid'];
  profileUuid: EducationEntity['profileUuid'];
  title: EducationEntity['title'];
  description: EducationEntity['description'];
  startDate: EducationEntity['startDate'];
  endDate: EducationEntity['endDate'];
  skills: EducationSkill[];
  createdAt: EducationEntity['createdAt'];
  updatedAt: EducationEntity['updatedAt'];
  deletedAt: EducationEntity['deletedAt'];
};
