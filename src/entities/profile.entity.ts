import { AbstractEntitySkills, SkillEntity } from '@entities/skill.entity';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  Opt,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';

export const FIRST_NAME_MIN_LENGTH = 1;
export const FIRST_NAME_MAX_LENGTH = 64;

export const LAST_NAME_MIN_LENGTH = 1;
export const LAST_NAME_MAX_LENGTH = 64;

export const TITLE_MAX_LENGTH = 128;

export const LOCATION_MAX_LENGTH = 128;

export const CONTACT_EMAIL_MAX_LENGTH = 320;

export const CONTACT_PHONE_NUMBER_MAX_LENGTH = 32;

@Entity({ tableName: 'profiles' })
export class ProfileEntity {
  @PrimaryKey({ name: 'uuid', type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  readonly uuid: Opt<string> = crypto.randomUUID();

  @Property({
    name: 'first_name',
    type: 'varchar',
    length: FIRST_NAME_MAX_LENGTH,
    nullable: false,
  })
  firstName!: string;

  @Property({
    name: 'last_name',
    type: 'varchar',
    length: LAST_NAME_MAX_LENGTH,
    nullable: false,
  })
  lastName!: string;

  @Property({
    name: 'title',
    type: 'varchar',
    length: TITLE_MAX_LENGTH,
    nullable: true,
  })
  title?: string;

  @Property({ name: 'biography', type: 'text', nullable: true })
  biography?: string;

  @Property({
    name: 'birth_date',
    type: 'timestamp with time zone',
    nullable: true,
  })
  birthDate?: Date;

  @Property({
    name: 'location',
    type: 'varchar',
    length: LOCATION_MAX_LENGTH,
    nullable: true,
  })
  location?: string;

  @Property({
    name: 'contact_email',
    type: 'varchar',
    length: CONTACT_EMAIL_MAX_LENGTH,
    nullable: true,
  })
  contactEmail?: string;

  @Property({
    name: 'contact_phone_number',
    type: 'varchar',
    length: CONTACT_PHONE_NUMBER_MAX_LENGTH,
    nullable: true,
  })
  contactPhoneNumber?: string;

  @OneToOne(
    () => LinkedInProfileEntity,
    (linkedInProfile) => linkedInProfile.profile,
    { nullable: true, mappedBy: 'profile' },
  )
  linkedInProfile?: Rel<LinkedInProfileEntity>;

  @OneToOne(
    () => GitHubProfileEntity,
    (gitHubProfile) => gitHubProfile.profile,
    {
      nullable: true,
      mappedBy: 'profile',
    },
  )
  gitHubProfile?: Rel<GitHubProfileEntity>;

  @ManyToMany({
    entity: () => SkillEntity,
    pivotEntity: () => ProfileSkillsEntity,
  })
  skills = new Collection<SkillEntity>(this);

  @Property({
    name: 'updated_at',
    type: 'timestamp with time zone',
    nullable: false,
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Opt<Date> = new Date();
}

export const LINKEDIN_SLUG_MAX_LENGTH = 64;

@Entity({ tableName: 'linkedin_profiles' })
export class LinkedInProfileEntity {
  @PrimaryKey({ name: 'uuid', type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  readonly uuid: Opt<string> = crypto.randomUUID();

  @Property({
    name: 'slug',
    type: 'varchar',
    length: LINKEDIN_SLUG_MAX_LENGTH,
    nullable: true,
  })
  slug?: string;

  @Property({
    name: 'updated_at',
    type: 'timestamp with time zone',
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Opt<Date> = new Date();

  @OneToOne(() => ProfileEntity, {
    fieldName: 'profile_uuid',
    nullable: false,
    deleteRule: 'cascade',
    unique: true,
  })
  profile!: ProfileEntity;
}

export const GITHUB_USERNAME_MAX_LENGTH = 64;

@Entity({ tableName: 'github_profiles' })
export class GitHubProfileEntity {
  @PrimaryKey({ name: 'uuid', type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  readonly uuid: Opt<string> = crypto.randomUUID();

  @Property({
    name: 'username',
    type: 'varchar',
    length: GITHUB_USERNAME_MAX_LENGTH,
    nullable: true,
  })
  username?: string;

  @Property({
    name: 'updated_at',
    type: 'timestamp with time zone',
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Opt<Date> = new Date();

  @OneToOne(() => ProfileEntity, {
    fieldName: 'profile_uuid',
    nullable: false,
    deleteRule: 'cascade',
    unique: true,
  })
  profile!: ProfileEntity;
}

@Entity({ tableName: 'profile_skills' })
export class ProfileSkillsEntity extends AbstractEntitySkills {
  @ManyToOne(() => ProfileEntity, {
    fieldName: 'profile_uuid',
    nullable: false,
    deleteRule: 'cascade',
    primary: true,
  })
  profile!: ProfileEntity;
}
