import { SkillEntity } from '@/index';
import {
  gitHubProfileSchema,
  linkedInProfileSchema,
  profileSchema,
  profileSkillsSchema,
} from '@schemas/profile.schema';
import { InferSelectModel } from 'drizzle-orm';

export type ProfileEntity = InferSelectModel<typeof profileSchema>;
export type LinkedInProfileEntity = InferSelectModel<
  typeof linkedInProfileSchema
>;
export type GitHubProfileEntity = InferSelectModel<typeof gitHubProfileSchema>;
export type ProfileSkillsEntity = InferSelectModel<typeof profileSkillsSchema>;

export type ProfileSkill = {
  uuid: SkillEntity['uuid'];
  label: SkillEntity['label'];
  iconUrl: SkillEntity['iconUrl'];
  associatedAt: ProfileSkillsEntity['createdAt'];
};

export type Profile = {
  uuid: ProfileEntity['uuid'];
  firstName: ProfileEntity['firstName'];
  lastName: ProfileEntity['lastName'];
  title: ProfileEntity['title'];
  biography: ProfileEntity['biography'];
  birthDate: ProfileEntity['birthDate'];
  linkedIn: {
    profileUrl: string;
  };
  gitHub: {
    profileUrl: string;
  };
  skills: ProfileSkill[];
  updatedAt: ProfileEntity['updatedAt'];
};
