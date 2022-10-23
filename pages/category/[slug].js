import Image from "next/future/image";
import Head from "next/head";
import Layout from "../../components/Layout";

import Link from "next/link";
import { SITE_META } from "../../lib/constants";

import data from "../../data/games";

export default function Category({ games, category }) {
  return (
    <Layout>
      <Head>
        <title>{category.name + ` Games | ` + SITE_META.NAME}</title>
        <meta
          name="description"
          content="Play the newest online casual games for free!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`category`}>
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>{category.name + ` Games`}</h2>
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
  const basicData = data?.data?.basicData;

  const games = basicData.filter((i) => i.category.slug === ctx.params.slug);

  return {
    props: {
      games,
      category: games[0].category,
    },
  };
};

export const getStaticPaths = async () => {
  const categories = data?.data?.categories;
  const paths = categories.map((i) => ({
    params: {
      slug: i.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
