export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner',
}

export type MinimalUser = {
  uuid: string;
  username: string;
};

export type User = MinimalUser & {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type PrivateUser = User & {
  email: string;
  role: UserRole;
};
