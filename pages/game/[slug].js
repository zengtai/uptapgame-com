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
import {
  ADSENSE_ID,
  ADS_SLOTS_ID,
  SITE_META,
  EXCLUED_GAMES,
} from "../../lib/constants";
import Script from "next/script";

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
      </Head>
      {/* <Script
        id={`gads-init`}
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy={`beforeInteractive`}
      /> */}
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
                          <div className="title">{i.title}</div>
                          <div>
                            <span className="item-rating">{i.rating}</span>
                            <span className="item-played">{i.played}</span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                  {/* {index === 3 || index === 7 ? (
                    <Banner
                      slot={ADS_SLOTS_ID.DETAIL}
                      format={[`horizontal`]}
                      auto
                    />
                  ) : null} */}
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
  fullData = fullData.filter(
    (i) => !EXCLUED_GAMES.includes(i.title.replace(/ /g, ``))
  );
  fullData.forEach((game) => {
    delete game.id;
    // delete game.appid;
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
    // appid: game.appid,
  }));

  return {
    props: {
      game,
      relatedGames,
    },
  };
};

export const getStaticPaths = async () => {
  let basicData = data?.data?.basicData;
  basicData = basicData.filter(
    (i) => !EXCLUED_GAMES.includes(i.title.replace(/ /g, ``))
  );
  const paths = basicData.map((i) => ({
    params: { slug: i.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};
