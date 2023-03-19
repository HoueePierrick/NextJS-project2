// Root component inside the body
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="" />
        <meta name="viewport" content="intial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
