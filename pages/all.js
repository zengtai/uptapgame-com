import Head from "next/head";
import Image from "next/future/image";
import Layout from "../components/Layout";

import { SITE_META } from "../lib/constants";
import Link from "next/link";
import data from "../data/games";

export default function AllGames({ games }) {
  // console.log(`all games: `, games);
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

      <div className={`all xl:mx-auto`}>
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>All Games</h2>
            <span className="total">{games.length}</span>
          </div>
          <ul className={`section-body`}>
            {games.map((i) => (
              <li key={i.slug} className="list-item">
                <Link href={`/game/` + i.slug}>
                  <a>
                    <Image
                      className="image"
                      src={i.thumbnailUrl}
                      alt={i.title}
                      width={100}
                      height={100}
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
  const games = data?.data?.basicData;

  return {
    props: {
      games,
    },
  };
};
