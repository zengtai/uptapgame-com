import Head from "next/head";
import Image from "next/future/image";
import Layout from "../components/Layout";

import { SITE_META } from "../lib/constants";
import Link from "next/link";
import data from "../data/games";
import { getImageUrl } from "../lib/api";
import List from "../components/List";

export default function AllGames({ games }) {
  console.log(`all games: `, games);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta
          name="description"
          content="Play the newest online casual games for free!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`archived all`}>
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
  games.forEach((element) => {
    delete element.id;
    delete element.rating;
    delete element.thumbnailUrl;
  });
  return {
    props: {
      games,
    },
  };
};
