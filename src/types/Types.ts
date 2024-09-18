import { MSG_TYPE } from "./Event";

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

export type NotificationType = {
  name?: string;
  groupName?: string;
  message?: string;
  time?: Date;
};

export type PrivateChatRoom = {
  userId: string;
  profileUrl: string;
  name: string;
  slugName: string;
  roomId: string;
  isMessaged: boolean;
  members?: string[];
};

export type MediaType = {
  mediaUrl: string;
  mediaPath: string;
};

export type LiveMsg = {
  _id: string;
  chatGroup: string;
  content?: string;
  attachments?: MediaType[];
  type: string;
  sender: {
    _id: string;
    name: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
};

// connected type
type Admin_Type = {
  _id: string;
  name: string;
  slugName: string;
  email: string;
};

export type Member_Type = {
  _id: string;
  role: string;
  name: string;
  email: string;
  isVerified: boolean;
  slugName: string;
  profileUrl: string;
};

type Lst_Message_Type = {
  _id: string;
  content: string;
  type: MSG_TYPE;
  createdAt: Date;
};
export type ConnectedChat = {
  _id: string;
  name: string;
  isGroupChat: boolean;
  isMessaged: boolean;
  admin: Admin_Type;
  profile: 1;
  memberDetails?: Member_Type[];
  lastMessage: Lst_Message_Type;
};
