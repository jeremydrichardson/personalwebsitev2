import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "../styles/prism-night-owl.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
