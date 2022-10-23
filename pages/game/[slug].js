import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import data from "../../data/games.json";
import { SITE_META } from "../../lib/constants";

export default function Game({ game, relatedGames }) {
  return (
    <Layout>
      <Head>
        <title>{`Play ` + game.title + ` on ` + SITE_META.NAME}</title>
      </Head>
      <div className="detail max-w-5xl mx-auto">
        <section className="mx-8 xl:mx-0">
          <div className="flex mb-4 xl:space-x-0 space-x-4 xl:justify-between xl:flex-row-reverse">
            <Image
              className="rounded-xl w-32 h-32 xl:w-[200px] xl:h-[200px] xl:shadow-xl xl:shadow-slate-300"
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
                <Link href={`/category/` + game.category.slug}>
                  <a className="inline-block py-1 px-2 text-xs uppercase bg-slate-600 text-slate-200 rounded-md">
                    {game.category.name}
                  </a>
                </Link>

                <div className="text-center my-2 grid content-center text-xl font-bold text-white w-10 h-10 bg-orange-500 rounded-full">
                  <span>{game.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <Link href={game.url}>
            <a
              className="block text-center bg-orange-500 xl:w-[300px] py-4 px-8 text-white rounded-full font-bold text-xl shadow-lg shadow-orange-100"
              title={`Play ` + game.title + ` Now`}
            >
              Play Now
            </a>
          </Link>
          <div className="py-4">{game.description}</div>
        </section>
        <section>
          <h2 className="xl:text-2xl text-lg font-bold my-4 mx-8 xl:mx-0">
            You may also like
          </h2>

          <List
            items={relatedGames}
            className={`mx-8 xl:mx-0 mb-4 grid xl:grid-cols-6 grid-cols-4 gap-4 xl:gap-6`}
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
