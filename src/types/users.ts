import { userSchema } from '@schemas/user.schema';
import { InferSelectModel } from 'drizzle-orm';

export type UserEntity = InferSelectModel<typeof userSchema>;

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
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
