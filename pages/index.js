import Image from "next/future/image";
import Head from "next/head";
import Layout from "../components/Layout";

import Link from "next/link";

import { SITE_META, ADSENSE_ID, ADS_SLOTS_ID } from "../lib/constants";
// import { getImageUrl } from "../lib/api";
import data from "../data/games";
import List from "../components/List";
// import ListItem from "../components/ListItem";
import Banner from "../components/Banner";

export default function Home({ games }) {
  console.log(`games: `, games);
  // console.log(`categories: `, categories);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta name="description" content={SITE_META.TAGLINE} />
        <link rel="icon" href="/favicon.ico" />
        <script
          id={`gads-init`}
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </Head>

      <div className={`home`}>
        {games.map((i, index) => (
          <>
            {/* {[2, 6, 9].includes(index) ? <Banner auto /> : null} */}
            <section key={i.category.slug}>
              <div className={`section-head`}>
                <h2 className={`h2`}>{i.category.name + ` Games`}</h2>
                <span className="total">
                  <Link href={`/category/` + i.category.slug}>{i.total}</Link>
                </span>
              </div>
              <div className="section-body">
                <List items={i.data.slice(0, 4)} option={[`rating`]} />
              </div>
            </section>
            {/* {index === 11 ? <Banner auto /> : null} */}
          </>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const dataForHome = data?.data?.dataForHome;
  // const categories = games.map((i) => i.category);
  let games = dataForHome.slice().sort((i) => (i.total < 4 ? 1 : -1)); // 数量小于6的分类排序后置

  games.forEach((i) => {
    i.data.forEach((element) => {
      delete element.id;
      delete element.thumbnailUrl;
    });
  });

  return {
    props: {
      games,
      // categories,
    },
  };
};
