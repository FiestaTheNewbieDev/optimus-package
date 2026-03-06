import {
  Entity,
  Filter,
  Index,
  ManyToOne,
  Opt,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

export const FIRST_NAME_MIN_LENGTH = 1;
export const FIRST_NAME_MAX_LENGTH = 64;

export const LAST_NAME_MIN_LENGTH = 1;
export const LAST_NAME_MAX_LENGTH = 64;

export const ORGANIZATION_NAME_MIN_LENGTH = 1;
export const ORGANIZATION_NAME_MAX_LENGTH = 128;

export const EMAIL_MAX_LENGTH = 320;

export const PHONE_NUMBER_MAX_LENGTH = 32;

export const LANG_MAX_LENGTH = 5;

@Entity({ tableName: 'contact_messages' })
@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
})
@Index({ name: 'email_idx', properties: ['email'] })
@Index({ name: 'phone_number_idx', properties: ['phoneNumber'] })
@Index({ name: 'created_at_idx', properties: ['createdAt'] })
export class ContactMessageEntity {
  @PrimaryKey({ name: 'uuid', type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  readonly uuid: Opt<string> = crypto.randomUUID();

  @ManyToOne({
    name: 'profile_uuid',
    entity: () => 'Profile',
    nullable: false,
    deleteRule: 'cascade',
  })
  profile!: string;

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
    name: 'organization_name',
    type: 'varchar',
    length: ORGANIZATION_NAME_MAX_LENGTH,
    nullable: true,
  })
  organizationName?: string;

  @Property({
    name: 'email',
    type: 'varchar',
    length: EMAIL_MAX_LENGTH,
    nullable: false,
  })
  email!: string;

  @Property({
    name: 'phone_number',
    type: 'varchar',
    length: PHONE_NUMBER_MAX_LENGTH,
    nullable: true,
  })
  phoneNumber?: string;

  @Property({ name: 'message', type: 'text', nullable: false })
  message!: string;

  @Property({
    name: 'lang',
    type: 'varchar',
    length: LANG_MAX_LENGTH,
    nullable: true,
  })
  lang?: string;

  @Property({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
    defaultRaw: 'now()',
  })
  readonly createdAt: Opt<Date> = new Date();

  @Property({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;
}
