import Head from "next/head";
import Layout from "../components/Layout";

import {
  ADSENSE_ID,
  ADS_SLOTS_ID,
  EXCLUED_GAMES,
  SITE_META,
} from "../lib/constants";
// import Link from "next/link";
import data from "../data/games";
// import { getImageUrl } from "../lib/api";
import Script from "next/script";
import Banner from "../components/Banner";
import List from "../components/List";

export default function AllGames({ games }) {
  console.log(`all games: `, games);
  return (
    <Layout>
      <Head>
        <title>{`All Games | ` + SITE_META.TAGLINE}</title>
      </Head>
      <Script
        id={`gads-init`}
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy={`beforeInteractive`}
      />

      <div className={`archived all`}>
        {/* <Banner auto slot={ADS_SLOTS_ID.CATEGORY} /> */}
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>All Games</h2>
            <span className="total">{games.length}</span>
          </div>
          <div className={`section-body`}>
            <List items={games} />
          </div>
          {/* <Link href={`/category`}>
            <a className="link-more">More</a>
          </Link> */}
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  let games = data?.data?.basicData;
  games = games.filter(
    (i) => !EXCLUED_GAMES.includes(i.title.replace(/ /g, ``))
  );
  games.forEach((element) => {
    delete element.id;
    delete element.rating;
    delete element.thumbnailUrl;
    element.appid = element.title.replace(/ /g, ``);
  });
  return {
    props: {
      games,
    },
  };
};
