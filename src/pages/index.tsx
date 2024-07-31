import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "@/components/Forms/Login";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/Auth.store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLogin, user, setAuthUser, validateAuthUser } = useAuthStore();

  console.log({ isLogin });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!user) {
        const currentUser = await validateAuthUser();
        if (!currentUser) return router.push("/");
        setAuthUser(currentUser);
      }
    })();
  }, []);

  const redirectToMain = () => {
    isLogin === true ? router.push("/Chat") : router.push("/Auth");
  };

  return (
    <main className={`flex items-center justify-center h-screen`}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[3rem] font-bold">BARTA</h1>
        <button
          className="px-8 py-4 bg-green-900 text-xl font-medium rounded-full text-gray-200 mt-8 hover:bg-green-950"
          onClick={redirectToMain}
        >
          Start Connect With People
        </button>
      </div>
    </main>
  );
}
