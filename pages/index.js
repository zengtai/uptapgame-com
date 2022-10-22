import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>UpTapGame | Free Online Games to Play</title>
        <meta
          name="description"
          content="Play the newest online casual games for free!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`container`}>
        <div className={`section-head mx-8 my-4 text-slate-700`}>
          <div className="flex space-x-2 items-center">
            <h2 className={`text-lg font-bold`}>Adventure Games</h2>
            <span className="bg-slate-200 px-2 rounded-md">45</span>
          </div>
        </div>
        <div className={`section-body`}>
          <ul>
            <li>
              <Image src="" alt="" width={100} height={100} />
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
