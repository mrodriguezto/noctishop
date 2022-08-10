export type IUser = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'client';
  createdAt: string;
  updatedAt: string;
};

export type IApiUser = { email: string; name: string; role: string };
