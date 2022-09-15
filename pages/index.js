import Head from "next/head";

export default function Home() {
  return (
    <div className={`container`}>
      <Head>
        <title>UpTapGame | Free Online Games to Play</title>
        <meta
          name="description"
          content="Play the newest online casual games for free!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`main`}></main>

      <footer className={`footer`}></footer>
    </div>
  );
}
