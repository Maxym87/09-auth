export type User = {
  email: string;
  username: string;
  avatar?: string;
};

export type UpdateUserRequest = {
  username: string;
};
