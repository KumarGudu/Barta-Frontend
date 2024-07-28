import { AuthUser } from "@/types";
import { BASE_URL } from "@/utils";
import { create } from "zustand";

type AuthState = {
  isRegister: boolean;
  isLogin: boolean;
  user?: Partial<AuthUser>;
};

type AuthAction = {
  updateRegister: (isRegister: boolean) => void;
  setAuthUser: (user: Partial<AuthUser>) => void;
};

const useAuthStore = create<AuthState & AuthAction>((set) => ({
  isRegister: false,
  isLogin: false,
  updateRegister: (isRegister: boolean) => {
    set(() => ({ isRegister: isRegister }));
  },
  setAuthUser: async (user: Partial<AuthUser>) => {
    set({
      user: { ...user },
    });
    set(() => ({ isLogin: true }));
  },

  validateAuthUser: async (user: Partial<AuthUser>) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/self`, {
        method: "GET",
      });
      if (res.status !== 200) {
        throw new Error("Server Side Error");
      }
      const data = await res.json();
      const currentUser = data?.user as AuthUser;
      return currentUser;
    } catch (error) {
      set({ user: undefined });
    }
  },
}));

export default useAuthStore;
