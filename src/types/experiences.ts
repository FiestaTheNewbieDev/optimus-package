import { AssociatedSkill } from '@/types/skills';

export type ExperienceSkill = AssociatedSkill;

export type Experience = {
  uuid: string;
  profileUuid: string;
  title: string;
  description: string;
  images: string[];
  startDate: Date;
  endDate: Date | null;
  skills: ExperienceSkill[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
