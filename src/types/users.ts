import { userSchema } from '@schemas/user.schema';
import { InferSelectModel } from 'drizzle-orm';

export type UserSchema = typeof userSchema;
export type UserEntity = InferSelectModel<UserSchema>;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner',
}

export type MinimalUser = {
  uuid: UserEntity['uuid'];
  username: UserEntity['username'];
};

export type User = MinimalUser & {
  createdAt: UserEntity['createdAt'];
  updatedAt: UserEntity['updatedAt'];
  deletedAt: UserEntity['deletedAt'];
};

export type PrivateUser = User & {
  email: UserEntity['email'];
  role: UserRole;
};
