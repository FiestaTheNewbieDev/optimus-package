import { AssociatedSkill } from '@/types/skills';
import { ProfileEntity } from '@entities/profile.entity';
import {
  gitHubProfileSchema,
  linkedInProfileSchema,
  profileSchema,
  profileSkillsSchema,
} from '@schemas/profile.schema';

export type ProfileSchema = typeof profileSchema;

export type LinkedInProfileSchema = typeof linkedInProfileSchema;

export type GitHubProfileSchema = typeof gitHubProfileSchema;

export type ProfileSkillsSchema = typeof profileSkillsSchema;

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
