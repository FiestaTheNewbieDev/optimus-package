import { UserRole } from '@/types';
import {
  Entity,
  Enum,
  Filter,
  Opt,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 32;
export const USERNAME_REGEX = /^[a-zA-Z0-9._\-']+$/;

export const EMAIL_MAX_LENGTH = 320;

@Entity({ tableName: 'users' })
@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
})
export class UserEntity {
  @PrimaryKey({ name: 'uuid', type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  readonly uuid: Opt<string> = crypto.randomUUID();

  @Property({
    name: 'username',
    type: 'varchar',
    length: USERNAME_MAX_LENGTH,
    nullable: false,
    unique: true,
  })
  username!: string;

  @Property({
    name: 'email',
    type: 'varchar',
    length: EMAIL_MAX_LENGTH,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Property({ name: 'password', type: 'text', nullable: false })
  password!: string;

  @Enum({
    name: 'role',
    items: () => UserRole,
    nullable: false,
    default: 'user',
    nativeEnumName: 'user_role',
  })
  role: Opt<UserRole> = UserRole.USER;

  @Property({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
    defaultRaw: 'now()',
  })
  readonly createdAt: Opt<Date> = new Date();

  @Property({
    name: 'updated_at',
    type: 'timestamp with time zone',
    nullable: false,
    defaultRaw: 'now()',
  })
  readonly updatedAt: Opt<Date> = new Date();

  @Property({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;
}
