import { UserEntity } from '@entities/user.entity';

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
