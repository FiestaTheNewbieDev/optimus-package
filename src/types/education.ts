import { AssociatedSkill } from '@/types/skills';

export type EducationSkill = AssociatedSkill;

export type Education = {
  uuid: string;
  profileUuid: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  skills: EducationSkill[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
