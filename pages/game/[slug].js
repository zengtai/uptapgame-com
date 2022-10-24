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
    function handleClick(e) {
      e.preventDefault();
      console.log(`Event: `, e);
      gtag && gtag("event", "click_CTA", { game: game.title });
    }
    const CTA = document.querySelector(".play_btn");
    CTA.addEventListener("click", handleClick);
  }, [game.title]);
  return (
    <Layout>
      <Head>
        <title>{`Play ` + game.title + ` on ` + SITE_META.NAME}</title>
      </Head>
      <div className="detail max-w-5xl mx-auto">
        <section className="mx-8 xl:mx-0">
          <div className="flex mb-6 xl:space-x-0 space-x-4 xl:justify-between xl:flex-row-reverse">
            <Image
              className="rounded-2xl w-40 h-40 xl:w-[200px] xl:h-[200px] shadow-xl shadow-slate-300 xl:shadow-xl xl:shadow-slate-300"
              src={game.thumbnailUrl}
              width={200}
              height={200}
              alt={game.title}
            />
            <div>
              <h1 className="text-2xl leading-6 xl:text-5xl my-2 xl:mb-6 font-black text-slate-700">
                {game.title}
              </h1>
              <div className="xl:flex xl:flex-row xl:items-center xl:space-x-2">
                <div className="text-center my-2 grid content-center text-xl font-bold text-white w-10 h-10 bg-orange-500 rounded-full">
                  <span>{game.rating}</span>
                </div>
                <Link href={`/category/` + game.category.slug}>
                  <a className="inline-block py-1 px-2 text-xs uppercase bg-slate-600 text-slate-200 rounded-md">
                    {game.category.name}
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <Link href={game.url}>
            <a
              className="play_btn block text-center bg-orange-500 xl:w-[300px] py-4 px-8 text-white rounded-full font-bold text-xl shadow-lg shadow-orange-100"
              title={`Play ` + game.title + ` Now`}
            >
              Play Now
            </a>
          </Link>
          <div className="p-4 my-4 xl:my-6 rounded-lg bg-slate-100 text-slate-700">
            <h3 className="font-bold mb-2">Description</h3>
            {game.description}
          </div>
        </section>
        <section>
          <div className="section-head">
            <h2 className="h2">You may also like</h2>
          </div>
          <List
            items={relatedGames}
            className={`mx-8 xl:mx-0 mb-4 grid xl:grid-cols-6 grid-cols-3 gap-4 xl:gap-6`}
          />
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
