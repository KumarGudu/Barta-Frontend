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
  START_TYPING: ({
    groupId,
    userId,
    name,
  }: {
    groupId: string;
    userId: string;
    name: string;
  }) => void;

  STOP_TYPING: ({
    groupId,
    userId,
    name,
  }: {
    groupId: string;
    userId: string;
    name: string;
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

  ON_SAVE_MESSAGE: ({
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

  START_TYPING: ({
    groupId,
    userId,
    name,
  }: {
    groupId: string;
    userId: string;
    name: string;
  }) => void;

  STOP_TYPING: ({
    groupId,
    userId,
    name,
  }: {
    groupId: string;
    userId: string;
    name: string;
  }) => void;

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
    isFirstMessageOfTheDay,
  }: {
    groupId: string;
    type: string;
    message: string;
    isFirstTime?: boolean;
    members?: string[];
    isFirstMessageOfTheDay?: boolean;
  }) => void;

  REPLY_MSG: ({ groupId }: { groupId: string }) => void;

  OFFLINE_USER: (userId: string) => void;
}
