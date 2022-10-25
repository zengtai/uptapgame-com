import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import List from "../../components/List";
// import ListItem from "../../components/ListItem";
import data from "../../data/games.json";
import { getGameUrl, getImageUrl } from "../../lib/api";
import { SITE_META } from "../../lib/constants";

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
      <div className="detail max-w-5xl mx-auto">
        <section className="mx-2 xl:mx-0">
          <div className="game-meta">
            <Image
              className="image"
              src={getImageUrl(game.title)}
              width={200}
              height={200}
              alt={game.title}
              loading={`eager`}
            />
            <div>
              <h1 className="title">{game.title}</h1>
              <div className="game-info">
                <div className="game-rating">
                  <span>{game.rating}</span>
                </div>
                <Link href={`/category/` + game.category.slug}>
                  <a className="game-category">{game.category.name}</a>
                </Link>
              </div>
            </div>
          </div>
          <Link href={getGameUrl(game.title)}>
            <a className="play-btn" title={`Play ` + game.title + ` Now`}>
              Play Now
            </a>
          </Link>
          <div className="description">
            <h3 className="font-bold mb-2">Description</h3>
            {game.description}
          </div>
        </section>
        <section>
          <div className="section-head">
            <h2 className="h2">You may also like</h2>
          </div>
          <ul className={`section-body`}>
            {relatedGames.map((i, index) => (
              <li key={i.slug} className="list-item relative">
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
