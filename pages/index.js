import Head from "next/head";
import Layout from "../components/Layout";
import Script from "next/script";

import Link from "next/link";

import {
  ADSENSE_ID,
  ADS_SLOTS_ID,
  SITE_META,
  EXCLUED_GAMES,
} from "../lib/constants";
// import { getImageUrl } from "../lib/api";
import List from "../components/List";
import data from "../data/games";
// import ListItem from "../components/ListItem";
import Banner from "../components/Banner";
import { Fragment } from "react";

export default function Home({ games }) {
  console.log(`games: `, JSON.stringify(games));
  // console.log(`categories: `, categories);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta name="description" content={SITE_META.TAGLINE} />
      </Head>
      {/* <Script
        id={`gads-init`}
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy={`beforeInteractive`}
      /> */}

      <div className={`home`}>
        {games.map((i, index) => (
          <Fragment key={i.category.slug}>
            {/* {[2, 6, 9].includes(index) ? (
              <Banner auto slot={ADS_SLOTS_ID.HOME} />
            ) : null} */}
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
            {/* {index === 11 ? <Banner auto slot={ADS_SLOTS_ID.HOME} /> : null} */}
          </Fragment>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  // const dataForHome = data?.data?.dataForHome;
  const basicData = data?.data?.basicData;
  // const categories = games.map((i) => i.category);

  // let games = dataForHome.slice().sort((i) => (i.total < 4 ? 1 : -1)); // 数量小于4的分类排序后置

  let tmp =
    EXCLUED_GAMES &&
    basicData
      .slice()
      .filter((i) => !EXCLUED_GAMES.includes(i.title.replace(/ /g, ``)));

  let tmpCategories = tmp.map((i) => i.category.slug);
  tmpCategories = [...new Set(tmpCategories)];

  let homeData = [];
  tmpCategories.sort().forEach((i) => {
    let games = tmp.filter((game) => game.category.slug === i);
    homeData.push({
      category: {
        slug: i,
        name: i
          .replace(/-/, ` `)
          .replace(/^\S/, (s) => s.toUpperCase())
          .replace(/Io/, `IO`),
      },
      data: games.slice(0, 4),
      total: games.length,
    });
  });
  homeData = homeData.sort((i) => (i.total <= 3 ? 1 : -1));
  homeData.forEach((i) =>
    i.data.forEach((g) => {
      delete g.category;
      delete i.thumbnailUrl;
    })
  );

  return {
    props: {
      games: homeData,
      // categories,
    },
  };
};
