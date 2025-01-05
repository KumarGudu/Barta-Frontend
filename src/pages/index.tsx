import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/Auth.store";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLogin, user, setAuthUser, validateAuthUser } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

  const redirectToMain = async () => {
    const token = localStorage.getItem("token");
    const currentUser = await validateAuthUser(token);
    setAuthUser(currentUser);
    currentUser ? router.push("/Chat") : router.push("/Auth");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      redirectToMain();
      setIsLoading(false); // Stop loading after redirecting
    }, 1000); // Change to 1000ms to show loading for a bit

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      {/* Fixed Header */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center text-white">
        <h1 className="text-sm sm:text-base md:text-2xl lg:text-3xl font-semibold animate-pulse">
          Welcome To
        </h1>
        <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-yellow-300 animate-pulse">
          S-Homes Chat
        </h2>
      </div>

      {/* Connecting Animation */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center space-y-6 mt-24">
          <div className="w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>
          <p className="text-sm sm:text-base md:text-lg font-semibold text-white">
            Connecting...
          </p>
        </div>
      )}
    </main>
  );
}
