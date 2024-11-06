import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/Auth.store";
const AuthLogin = dynamic(() => import("../Components/Forms/Login"), {
  loading: () => <p>Loading...</p>,
});
const AuthRegister = dynamic(() => import("../Components/Forms/Register"), {
  loading: () => <p>Loading...</p>,
});

const Auth = () => {
  const [login, setIsLogin] = useState<boolean>(true);
  const router = useRouter();
  const { isLogin } = useAuthStore();
  const toggleAuth = () => {
    setIsLogin(!login);
  };
  useEffect(() => {
    if (isLogin) router.push("/Chat");
  }, [isLogin]);
  return (
    <>
      <main>
        {/* <button onClick={handleGO}>Go to main</button> */}
        {login ? (
          <AuthLogin toggleAuth={toggleAuth} />
        ) : (
          <AuthRegister toggleAuth={toggleAuth} />
        )}
      </main>
    </>
  );
};

export default Auth;
