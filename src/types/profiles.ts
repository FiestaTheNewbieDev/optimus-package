import { AssociatedSkill } from '@/types/skills';
import {
  gitHubProfileSchema,
  linkedInProfileSchema,
  profileSchema,
  profileSkillsSchema,
} from '@schemas/profile.schema';
import { InferSelectModel } from 'drizzle-orm';

export type ProfileEntity = InferSelectModel<typeof profileSchema> & {
  linkedIn: LinkedInProfileEntity;
  gitHub: GitHubProfileEntity;
};

export type LinkedInProfileEntity = InferSelectModel<
  typeof linkedInProfileSchema
>;
export type GitHubProfileEntity = InferSelectModel<typeof gitHubProfileSchema>;
export type ProfileSkillsEntity = InferSelectModel<typeof profileSkillsSchema>;

export type ProfileSkill = AssociatedSkill;

export type Profile = {
  uuid: ProfileEntity['uuid'];
  firstName: ProfileEntity['firstName'];
  lastName: ProfileEntity['lastName'];
  fullName: `${ProfileEntity['firstName']} ${ProfileEntity['lastName']}`;
  title: ProfileEntity['title'];
  biography: ProfileEntity['biography'];
  location: ProfileEntity['location'];
  contactEmail: ProfileEntity['contactEmail'];
  contactPhoneNumber: ProfileEntity['contactPhoneNumber'];
  age: number | null;
  linkedIn: {
    profileUrl: string | null;
  };
  gitHub: {
    profileUrl: string | null;
  };
  updatedAt: ProfileEntity['updatedAt'];
};
