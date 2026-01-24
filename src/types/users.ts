import { userSchema } from '@schemas/user.schema';
import { InferSelectModel } from 'drizzle-orm';

export type UserEntity = InferSelectModel<typeof userSchema>;

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
}

export type User = {
  uuid: UserEntity['uuid'];
  username: UserEntity['username'];
  email: UserEntity['email'];
  role: UserRole;
  createdAt: UserEntity['createdAt'];
  updatedAt: UserEntity['updatedAt'];
  deletedAt: UserEntity['deletedAt'];
};
