import "../styles/index.scss";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import Layout from "../components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
