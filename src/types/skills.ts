export enum SkillCategory {
  LANGUAGE = 'language',
  FRAMEWORK = 'framework',
  LIBRARY = 'library',
  DATABASE = 'database',
  TOOL = 'tool',
  CLOUD = 'cloud',
  DEVOPS = 'devops',
  TESTING = 'testing',
  ARCHITECTURE = 'architecture',
  METHODOLOGY = 'methodology',
  SOFTSKILL = 'softskill',
  OTHER = 'other',
}

export type Skill = {
  slug: string;
  label: string;
  iconUrl: string | null;
  category: SkillCategory;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type AssociatedSkill<
  TData extends Record<string, unknown> = Record<string, unknown>,
> = {
  associatedAt: Date;
  skill: Skill;
} & TData;
