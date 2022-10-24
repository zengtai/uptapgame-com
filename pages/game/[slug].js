import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import List from "../../components/List";
// import ListItem from "../../components/ListItem";
import data from "../../data/games.json";
import { SITE_META } from "../../lib/constants";

export default function Game({ game, relatedGames }) {
  useEffect(() => {
    // 推送Play按钮点击数据
    function handleClick(e) {
      e.preventDefault();
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
        <section className="mx-8 xl:mx-0">
          <div className="game-meta">
            <Image
              className="image"
              src={game.thumbnailUrl}
              width={200}
              height={200}
              alt={game.title}
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
          <Link href={game.url}>
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
          <List items={relatedGames} />
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const fullData = data?.data?.fullData;
  const game = fullData.find((i) => i.slug === ctx.params.slug);
  const relatedGames = fullData
    .filter((i) => i.slug !== ctx.params.slug)
    .slice(0, 12);
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
