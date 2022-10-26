import Head from "next/head";
import Layout from "../components/Layout";

import Link from "next/link";

import { ADSENSE_ID, ADS_SLOTS_ID, SITE_META } from "../lib/constants";
// import { getImageUrl } from "../lib/api";
import List from "../components/List";
import data from "../data/games";
// import ListItem from "../components/ListItem";
import Banner from "../components/Banner";
import { Fragment } from "react";

export default function Home({ games }) {
  console.log(`games: `, games);
  // console.log(`categories: `, categories);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta name="description" content={SITE_META.TAGLINE} />
        <script
          id={`gads-init`}
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </Head>

      <div className={`home`}>
        {games.map((i, index) => (
          <Fragment key={i.category.slug}>
            {[2, 6, 9].includes(index) ? (
              <Banner auto slot={ADS_SLOTS_ID.HOME} />
            ) : null}
            <section>
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
            {index === 11 ? <Banner auto slot={ADS_SLOTS_ID.HOME} /> : null}
          </Fragment>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const dataForHome = data?.data?.dataForHome;
  // const categories = games.map((i) => i.category);
  let games = dataForHome.slice().sort((i) => (i.total < 4 ? 1 : -1)); // 数量小于4的分类排序后置

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
