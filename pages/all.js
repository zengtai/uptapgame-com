import Head from "next/head";
import Image from "next/future/image";
import Layout from "../components/Layout";

import { SITE_META } from "../lib/constants";
import Link from "next/link";
import data from "../data/games";
import { getImageUrl } from "../lib/api";

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

      <div className={`all`}>
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>All Games</h2>
            <span className="total">{games.length}</span>
          </div>
          <ul className={`section-body`}>
            {games.map((i, index) => (
              <li key={i.slug} className="item">
                <Link href={`/game/` + i.slug}>
                  <a>
                    <Image
                      className="image"
                      src={getImageUrl(i.title)}
                      alt={i.title}
                      width={100}
                      height={100}
                      loading={index <= 9 ? `eager` : `lazy`}
                    />
                    <div className="title">{i.title}</div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
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
