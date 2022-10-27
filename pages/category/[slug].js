import Image from "next/future/image";
import Head from "next/head";
import Layout from "../../components/Layout";

import Link from "next/link";
import {
  SITE_META,
  ADSENSE_ID,
  ADS_SLOTS_ID,
  EXCLUED_GAMES,
} from "../../lib/constants";

import data from "../../data/games";
import { getImageUrl } from "../../lib/api";
import Banner from "../../components/Banner";
import { Fragment } from "react";
import Script from "next/script";

export default function Category({ games, category }) {
  console.log(`games: `, games);
  return (
    <Layout>
      <Head>
        <title>{category.name + ` Games | ` + SITE_META.NAME}</title>
      </Head>
      {/* <Script
        id={`gads-init`}
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy={`beforeInteractive`}
      /> */}

      <div className={`archived`}>
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>{category.name + ` Games`}</h2>
            <span className="total">{games.length}</span>
          </div>
          <div className={`section-body`}>
            <ul className="list">
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
                      <a className="item-link">
                        <Image
                          className="image"
                          src={getImageUrl(i.title)}
                          alt={i.title}
                          width={100}
                          height={100}
                          loading={index <= 9 ? `eager` : `lazy`}
                        />
                        <div>
                          <div className="title">{i.title}</div>
                          <div>
                            <span className="item-rating">{i.rating}</span>
                            <span className="item-played">{i.played}</span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                  {/* {index === 2 ? (
                    <Banner
                      auto
                      format={[`horizontal`]}
                      slot={ADS_SLOTS_ID.CATEGORY}
                    />
                  ) : null} */}
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
  let fullData = data?.data?.fullData;
  fullData = fullData.filter(
    (i) => !EXCLUED_GAMES.includes(i.title.replace(/ /g, ``))
  );

  let games = [];
  let tmp = fullData.slice().filter((i) => i.category.slug === ctx.params.slug);
  games = tmp.map((game) => ({
    category: game.category,
    title: game.title,
    slug: game.slug,
    rating: game.rating,
    played: game.played,
    // appid: game.appid,
  }));

  return {
    props: {
      games,
      category: games[0].category,
    },
  };
};

export const getStaticPaths = async () => {
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

  const paths = tmpCategories.map((i) => ({
    params: {
      slug: i,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
