import { AssociatedSkill } from '@/types/skills';

export type ProfileSkill = AssociatedSkill;

export type Profile = {
  uuid: string;
  firstName: string;
  lastName: string;
  fullName: `${string} ${string}`;
  title: string | null;
  biography: string | null;
  location: string | null;
  contactEmail: string | null;
  contactPhoneNumber: string | null;
  age: number | null;
  linkedIn: {
    profileUrl: string | null;
  };
  gitHub: {
    profileUrl: string | null;
  };
  updatedAt: Date;
};
