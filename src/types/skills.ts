import { skillSchema } from '@schemas/skill.schema';
import { InferSelectModel } from 'drizzle-orm';

export type SkillEntity = InferSelectModel<typeof skillSchema>;

export type Skill = {
  uuid: SkillEntity['uuid'];
  label: SkillEntity['label'];
  iconUrl: SkillEntity['iconUrl'];
  createdAt: SkillEntity['createdAt'];
  updatedAt: SkillEntity['updatedAt'];
  deletedAt: SkillEntity['deletedAt'];
};
