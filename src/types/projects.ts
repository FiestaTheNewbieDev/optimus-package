import { AssociatedSkill } from '@/types/skills';
import { projectSchema, projectSkillsSchema } from '@schemas/project.schema';
import { InferSelectModel } from 'drizzle-orm';

export type ProjectEntity = InferSelectModel<typeof projectSchema>;

export type ProjectSkillsEntity = InferSelectModel<typeof projectSkillsSchema>;

export type ProjectSkill = AssociatedSkill;

export type Project = {
  uuid: ProjectEntity['uuid'];
  profileUuid: ProjectEntity['profileUuid'];
  title: ProjectEntity['title'];
  description: ProjectEntity['description'];
  skills: ProjectSkill[];
  createdAt: ProjectEntity['createdAt'];
  updatedAt: ProjectEntity['updatedAt'];
  deletedAt: ProjectEntity['deletedAt'];
};
