import Image from "next/future/image";
import Link from "next/link";
import { useState } from "react";
import { getGameUrl, getImageUrl } from "../lib/api";
import { ADS_SLOTS_ID } from "../lib/constants";
import Banner from "./Banner";
export default function Detail({ game }) {
  const [showAll, setShowAll] = useState(false);

  function handleClick() {
    setShowAll(() => !showAll);
  }
  return (
    <>
      <div className="game-info">
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
          <div className="game-meta">
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

      {/* <Banner auto slot={ADS_SLOTS_ID.DETAIL} /> */}

      <div className="description">
        <div className="title">Description</div>
        <div
          onClick={handleClick}
          className={`content` + (!showAll ? ` h-16` : ` pb-4`)}
        >
          {game.description}
        </div>
      </div>
    </>
  );
}
