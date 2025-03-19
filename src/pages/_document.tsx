import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
       <Head>
        <title>CHAT-SHOMES</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
