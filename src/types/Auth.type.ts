export type AuthUser = {
  _id: string;
  name: string;
  slugName: string;
  role: string;
  email: string;
  createdAt: string;
  isVerified: boolean;
  isBlocked: boolean;
};
