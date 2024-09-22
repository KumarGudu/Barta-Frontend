export type MSG_TYPE =
  | "IMAGE"
  | "TEXT"
  | "VIDEO"
  | "AUDIO"
  | "DOCUMENT"
  | "HOUSE"
  | "LINK"
  | "CODE";

export interface ServerToClientEvents {
  ALERT: (message: string) => void;
  ONLINE_USERS: (users: string[]) => void;
  USER_ONLINE: ({
    groupId,
    userId,
    name,
    role,
  }: {
    groupId: string;
    userId: string;
    name?: string;
    role?: string;
  }) => void;

  USER_OFFLINE: ({
    groupId,
    userId,
    name,
    role,
  }: {
    groupId: string;
    userId: string;
    name?: string;
    role?: string;
  }) => void;

  JOIN_ROOM: ({
    groupId,
    isPrivateGroup,
    groupName,
  }: {
    groupId: string;
    isPrivateGroup: boolean;
    groupName: string;
  }) => void;

  LEAVE_ROOM: ({
    groupId,
    isPrivateGroup,
    groupName,
  }: {
    groupId: string;
    isPrivateGroup: boolean;
    groupName: string;
  }) => void;

  NEW_MESSAGE: ({
    groupId,
    message,
  }: {
    groupId: string;
    message: any;
  }) => void;

  FIRST_TIME_MESSAGE: ({
    groupId,
    message,
  }: {
    groupId: string;
    message: any;
  }) => void;
  NEW_MESSAGE_ALERT: ({ groupId }: { groupId: string }) => void;
}

export interface ClientToServerEvents {
  ALERT: (message: string) => void;
  JOIN_ROOM: ({
    groupId,
    isPrivateGroup,
    groupName,
    members,
  }: {
    groupId: string;
    isPrivateGroup: boolean;
    groupName: string;
    members: string[];
  }) => void;

  LEAVE_ROOM: ({
    groupId,
    isPrivateGroup,
    groupName,
  }: {
    groupId: string;
    isPrivateGroup: boolean;
    groupName: string;
  }) => void;
  NEW_MESSAGE: ({
    groupId,
    type,
    message,
    isFirstTime,
    members,
  }: {
    groupId: string;
    type: string;
    message: string;
    isFirstTime?: boolean;
    members?: string[];
  }) => void;

  OFFLINE_USER: (userId: string) => void;
}
