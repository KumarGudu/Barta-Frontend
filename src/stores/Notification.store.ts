import { NotificationType } from "@/types";
import { create } from "zustand";

type NotificationState = {
  notifications: NotificationType[] | [];
};

type NotificationsActions = {
  setNotification: (notification: NotificationType) => void;
};

const useNotificationStore = create<NotificationState & NotificationsActions>(
  (set) => ({
    notifications: [],
    setNotification: (notification: NotificationType) => {
      set((state) => ({
        notifications: [notification, ...state.notifications],
      }));
    },
  })
);

export default useNotificationStore;
