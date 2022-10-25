import Image from "next/future/image";
import Head from "next/head";
import Layout from "../../components/Layout";

import Link from "next/link";
import { SITE_META } from "../../lib/constants";

import data from "../../data/games";
import { getImageUrl } from "../../lib/api";

export default function Category({ games, category }) {
  console.log(`games: `, games);
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
            {games.map((i, index) => (
              <li key={i.slug} className="list-item relative">
                {index < 10 ? (
                  <div className="absolute grid items-center top-1 left-1 z-10 bg-white w-7 h-7 font-bold rounded-full text-center">
                    <span
                      className={
                        index < 1
                          ? `text-orange-500`
                          : index < 2
                          ? `text-sky-500`
                          : index < 3
                          ? `text-lime-500`
                          : `text-slate-400 text-sm`
                      }
                    >
                      {index + 1}
                    </span>
                  </div>
                ) : null}
                <Link href={`/game/` + i.slug}>
                  <a className="flex h-24 space-x-3 p-2 border rounded-2xl">
                    <Image
                      className="image"
                      src={getImageUrl(i.title)}
                      alt={i.title}
                      width={100}
                      height={100}
                      loading={index <= 9 ? `eager` : `lazy`}
                    />
                    <div>
                      <div className="mt-1 mb-3 text-sky-700">{i.title}</div>
                      <div>
                        <span className="bg-star mr-3 pl-6 bg-no-repeat text-orange-500 font-bold">
                          {i.rating}
                        </span>
                        <span className="bg-play pl-7 bg-no-repeat bg-left text-sm text-slate-400">
                          {i.played}
                        </span>
                      </div>
                    </div>
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
  const fullData = data?.data?.fullData;

  let games = [];
  let tmp = fullData.slice().filter((i) => i.category.slug === ctx.params.slug);
  games = tmp.map((game) => ({
    category: game.category,
    title: game.title,
    slug: game.slug,
    rating: game.rating,
    played: game.played,
  }));

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
