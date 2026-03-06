import { AssociatedSkill } from '@/types/skills';
import { ProjectEntity } from '@entities/project.entity';
import { projectSchema, projectSkillsSchema } from '@schemas/project.schema';

export type ProjectSchema = typeof projectSchema;

export type ProjectSkillsSchema = typeof projectSkillsSchema;

export type ProjectSkill = AssociatedSkill;

export type Project = {
  uuid: ProjectEntity['uuid'];
  profileUuid: ProjectEntity['profile']['uuid'];
  title: ProjectEntity['title'];
  description: ProjectEntity['description'];
  skills: ProjectSkill[];
  createdAt: ProjectEntity['createdAt'];
  updatedAt: ProjectEntity['updatedAt'];
  deletedAt: ProjectEntity['deletedAt'];
};
