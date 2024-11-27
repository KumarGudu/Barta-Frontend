import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/Auth.store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLogin, user, setAuthUser, validateAuthUser } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        localStorage.setItem("token", token);
        const currentUser = await validateAuthUser(token);
        setAuthUser(currentUser);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
        if (!currentUser) return router.push("/");
      }
    })();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("token", JSON.stringify(token));
  //   (async () => {
  //     if (!user) {
  //       const currentUser = await validateAuthUser(token);
  //       if (!currentUser) return router.push("/");
  //       setAuthUser(currentUser);
  //     }
  //   })();
  // }, [token]);

  const redirectToMain = async () => {
    const token = localStorage.getItem("token");
    const currentUser = await validateAuthUser(token);
    setAuthUser(currentUser);
    console.log("CURRENT_USER", currentUser);
    currentUser ? router.push("/Chat") : router.push("/Auth");
  };

  // const validateUser = async () => {
  //   if (token) {
  //     const currentUser = await validateAuthUser(token);
  //     setAuthUser(currentUser);
  //     if (currentUser && isLogin === true) {
  //       router.push("/");
  //     } else {
  //       router.push("/Chat");
  //     }
  //   } else {
  //     console.log("Token not found");
  //   }
  // };

  return (
    <main className={`flex items-center justify-center h-screen`}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[3rem] font-bold">S-Homes</h1>
        <button
          className="px-8 py-4 bg-green-900 text-xl font-medium rounded-full text-gray-200 mt-8 hover:bg-green-950"
          onClick={redirectToMain}
        >
          Connect With Us
        </button>
      </div>
    </main>
  );
}
