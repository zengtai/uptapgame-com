import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import Detail from "../../components/Detail";
import Layout from "../../components/Layout";
// import ListItem from "../../components/ListItem";
import Banner from "../../components/Banner";
import data from "../../data/games.json";
import { getImageUrl } from "../../lib/api";
import { ADSENSE_ID, ADS_SLOTS_ID, SITE_META } from "../../lib/constants";

export default function Game({ game, relatedGames }) {
  console.log(`game: `, game);
  console.log(`relatedGames: `, relatedGames);
  useEffect(() => {
    // 推送Play按钮点击数据
    function handleClick(e) {
      process.env.NODE_ENV === `development` ? e.preventDefault() : null;
      console.log(`Event: `, e);
      gtag && gtag("event", "click_CTA", { game: game.title });
    }
    const CTA = document.querySelector(".play-btn");
    CTA.addEventListener("click", handleClick);
  }, [game.title]);
  return (
    <Layout>
      <Head>
        <title>{`Play ` + game.title + ` on ` + SITE_META.NAME}</title>

        <script
          id={`gads-init`}
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </Head>
      <div className="detail">
        <Detail game={game} />
        <section>
          <div className="section-head">
            <h2 className="h2">You may also like</h2>
          </div>
          <div className={`section-body`}>
            <ul className="list">
              {relatedGames.map((i, index) => (
                <Fragment key={i.slug}>
                  <li className="item">
                    <Link href={`/game/` + i.slug}>
                      <a className="item-link">
                        <Image
                          className="image"
                          src={getImageUrl(i.title)}
                          alt={i.title}
                          width={100}
                          height={100}
                          loading={index <= 3 ? `eager` : `lazy`}
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
                  {index === 3 || index === 7 ? (
                    <Banner
                      slot={ADS_SLOTS_ID.DETAIL}
                      format={[`horizontal`]}
                      auto
                    />
                  ) : null}
                </Fragment>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  let fullData = data?.data?.fullData;

  fullData.forEach((game) => {
    delete game.id;
    delete game.appid;
    delete game.thumbnailUrl;
    delete game.url;
  });

  let game = fullData.find((i) => i.slug === ctx.params.slug);

  let relatedGames = [];
  let tmp = fullData.slice();
  tmp = tmp.filter((i) => i.slug !== ctx.params.slug).slice(0, 12);

  relatedGames = tmp.map((game) => ({
    category: game.category,
    title: game.title,
    slug: game.slug,
    rating: game.rating,
    played: game.played,
  }));

  return {
    props: {
      game,
      relatedGames,
    },
  };
};

export const getStaticPaths = async () => {
  const basicData = data?.data?.basicData;
  const paths = basicData.map((i) => ({ params: { slug: i.slug } }));
  return {
    paths,
    fallback: false,
  };
};
