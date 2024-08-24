export type AuthUser = {
  _id: string;
  name: string;
  slugName: string;
  phone?: string;
  countryCode?: string;
  profilePath?: string;
  profileUrl?: string;
  role: string;
  email: string;
  createdAt: string;
  isVerified: boolean;
  isBlocked: boolean;
  fcmToken?: string;
};

export type PrivateChatRoom = {
  userId: string;
  profileUrl: string;
  name: string;
  slugName: string;
  roomId: string;
};
