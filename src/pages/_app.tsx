import { InstallPWA } from "@/Components/core";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").then(() => {
      });
    }
  }, []);
  return (
    <>
      <InstallPWA />
      <Component {...pageProps} />
    </>
  );
}