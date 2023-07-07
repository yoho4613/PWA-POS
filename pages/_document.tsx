import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "../components/Navbar";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <body>
        <div className="flex">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
