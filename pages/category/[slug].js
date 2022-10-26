import Image from "next/future/image";
import Head from "next/head";
import Layout from "../../components/Layout";

import Link from "next/link";
import { SITE_META, ADSENSE_ID, ADS_SLOTS_ID } from "../../lib/constants";

import data from "../../data/games";
import { getImageUrl } from "../../lib/api";
import Banner from "../../components/Banner";
import { Fragment } from "react";

export default function Category({ games, category }) {
  console.log(`games: `, games);
  return (
    <Layout>
      <Head>
        <title>{category.name + ` Games | ` + SITE_META.NAME}</title>

        <script
          id={`gads-init`}
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </Head>

      <div className={`archived`}>
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>{category.name + ` Games`}</h2>
            <span className="total">{games.length}</span>
          </div>
          <div className={`section-body`}>
            <ul className="grid gap-2 xl:grid-cols-5 xl:gap-4">
              {games.map((i, index) => (
                <Fragment key={i.slug}>
                  <li className="item">
                    {index < 10 ? (
                      <div className="badge">
                        <span
                          className={
                            index < 1
                              ? `text-orange-500`
                              : index < 2
                              ? `text-sky-500`
                              : index < 3
                              ? `text-lime-500`
                              : `text-sm text-slate-400`
                          }
                        >
                          {index + 1}
                        </span>
                      </div>
                    ) : null}
                    <Link href={`/game/` + i.slug}>
                      <a className="flex space-x-3 rounded-2xl border p-2">
                        <Image
                          className="image"
                          src={getImageUrl(i.title)}
                          alt={i.title}
                          width={100}
                          height={100}
                          loading={index <= 9 ? `eager` : `lazy`}
                        />
                        <div>
                          <div className="mt-1 mb-3 text-sky-700">
                            {i.title}
                          </div>
                          <div>
                            <span className="mr-3 bg-star bg-no-repeat pl-6 font-bold text-orange-500">
                              {i.rating}
                            </span>
                            <span className="bg-play bg-left bg-no-repeat pl-7 text-sm text-slate-400">
                              {i.played}
                            </span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                  {index === 2 ? (
                    <Banner
                      auto
                      format={[`horizontal`]}
                      slot={ADS_SLOTS_ID.CATEGORY}
                    />
                  ) : null}
                </Fragment>
              ))}
            </ul>
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
