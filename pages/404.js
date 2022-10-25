import Head from "next/head";
import Layout from "../components/Layout";
import { SITE_META } from "../lib/constants";

export default function custom404({}) {
  return (
    <Layout>
      <Head>
        <title>{`404 | ` + SITE_META.NAME}</title>
      </Head>
      <div className={`flex flex-col text-center`}>
        <div className="mt-6 text-5xl font-bold">404</div>
        <p>Page Not Found.</p>
      </div>
    </Layout>
  );
}
