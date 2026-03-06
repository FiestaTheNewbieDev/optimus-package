import { AssociatedSkill } from '@/types/skills';
import { EducationEntity } from '@entities/education.entity';
import {
  educationSchema,
  educationSkillsSchema,
} from '@schemas/education.schema';

export type EducationSchema = typeof educationSchema;

export type EducationSkillsSchema = typeof educationSkillsSchema;

export type EducationSkill = AssociatedSkill;

export type Education = {
  uuid: EducationEntity['uuid'];
  profileUuid: EducationEntity['profile']['uuid'];
  title: EducationEntity['title'];
  description: EducationEntity['description'];
  startDate: EducationEntity['startDate'];
  endDate: EducationEntity['endDate'];
  skills: EducationSkill[];
  createdAt: EducationEntity['createdAt'];
  updatedAt: EducationEntity['updatedAt'];
  deletedAt: EducationEntity['deletedAt'];
};
