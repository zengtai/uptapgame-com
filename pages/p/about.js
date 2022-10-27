import Head from "next/head";
import Layout from "../../components/Layout";
import { FEATURED_GAMES, SITE_META } from "../../lib/constants";

export default function About(params) {
  const toTitle = (name) =>
    name
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/3 D/g, " 3D")
      .replace(/([A-Za-z])([0-9])/g, "$1 $2");
  return (
    <Layout>
      <Head>
        <title>{`About` + ` | ` + SITE_META.NAME}</title>
      </Head>
      <div className={`page`}>
        <section>
          <div className="section-head">
            <h2 className="h2">About</h2>
          </div>
          <div className="mx-8 mb-4 rounded-md bg-sky-200 p-4 text-sky-900">
            <p>Welcome to {SITE_META.NAME}!</p>
            <p>
              Our website is the leading platform for free online gaming,
              hosting high-quality hyper casual games for you to enjoy by
              killing time when you are bored. Along with more complex adventure
              and puzzle strategy games, that can save automatically and are
              almost endless so you won’t get bored.
            </p>
            <p>
              We develop and publish our own H5 games, and currently we have
              more than a 200, which you can freely play, without requiring you
              to download. Our games can be played on any device or a browser.
              Such games include{" "}
              {FEATURED_GAMES.map((i) => toTitle(i)).join(`, `)}.
            </p>
            <p>
              The games are divided in categories, which is therefore easy for
              you and players all around the world to have fun with many puzzle,
              strategy, card or sports games. Our games are entirely free and
              won’t require you to pay any services, as they are safe and
              secure.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
