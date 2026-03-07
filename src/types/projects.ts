import { AssociatedSkill } from '@/types/skills';

export type ProjectSkill = AssociatedSkill;

export type Project = {
  uuid: string;
  profileUuid: string;
  title: string;
  description: string;
  skills: ProjectSkill[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
