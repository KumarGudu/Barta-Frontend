import { isAuth } from "@/hooks/Auth_Data";
import { useRouter } from "next/router";
import React, { use, useEffect, useLayoutEffect } from "react";
type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
};
const Auth_Layout = ({ children, title }: Props) => {
  const router = useRouter();
  useLayoutEffect(() => {
    if (!isAuth) router.push("/");
  }, []);

  return <>{children}</>;
};

export default Auth_Layout;
