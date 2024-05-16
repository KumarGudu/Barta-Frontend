import React, { useState } from "react";
import dynamic from "next/dynamic";
const AuthLogin = dynamic(() => import("../Components/Forms/Login"), {
  loading: () => <p>Loading...</p>,
});
const AuthRegister = dynamic(() => import("../Components/Forms/Register"), {
  loading: () => <p>Loading...</p>,
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      <main>
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
