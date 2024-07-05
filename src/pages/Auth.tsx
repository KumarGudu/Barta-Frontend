import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const AuthLogin = dynamic(() => import("../Components/Forms/Login"), {
  loading: () => <p>Loading...</p>,
});
const AuthRegister = dynamic(() => import("../Components/Forms/Register"), {
  loading: () => <p>Loading...</p>,
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();
  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  function handleGO() {
    router.push("/Chat");
  }
  return (
    <>
      <main>
        {/* <button onClick={handleGO}>Go to main</button> */}
        {isLogin ? (
          <AuthLogin toggleAuth={toggleAuth} />
        ) : (
          <AuthRegister toggleAuth={toggleAuth} />
        )}
      </main>
    </>
  );
};

export default Auth;
