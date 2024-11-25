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
  validateAuthUser: (token: any) => Promise<AuthUser | undefined>;
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

  validateAuthUser: async (token: any) => {
    try {
      let res;
      res = await fetch(`${BASE_URL}auth/self`, {
        method: "GET",
        credentials: "include",
        headers: {
          "x-access-token": JSON.parse(token),
        },
      });
      if (res.status !== 200) {
        const accessRes = await fetch(`${BASE_URL}auth/refresh-access-token`, {
          method: "GET",
          credentials: "include",
        });
        if (accessRes.status === 200) {
          res = await fetch(`${BASE_URL}auth/self`, {
            method: "GET",
            credentials: "include",
          });
          const data = await res.json();
          const currentUser = data?.user as AuthUser;
          return currentUser;
        }

        throw new Error("Server Side Error");
      }
      const data = await res.json();
      const currentUser = data?.user as AuthUser;
      console.log("CURRENt_USER", currentUser);
      return currentUser;
    } catch (error) {
      set({ user: undefined });
    }
  },
}));

export default useAuthStore;
