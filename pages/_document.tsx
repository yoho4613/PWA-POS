import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#fff" />
        <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
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
