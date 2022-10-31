import Link from "next/link";
import { useEffect, useState } from "react";
import { data } from "../data/games.json";
import { EXCLUED_GAMES } from "../lib/constants";
import Image from "./Image";
export const games = data?.basicData
  .filter((i) => !EXCLUED_GAMES.includes(i.title.replace(/\s+/, ``)))
  .map((i) => i.title);
export default function Search(params) {
  const [result, setResult] = useState(games);
  const [query, setQuery] = useState(``);
  // const handleInput = () => {};

  const filterGames =
    query === ``
      ? []
      : games
          .filter((game) =>
            game.toLowerCase().replace(/\s+/g, ``).includes(query)
          )
          .sort((a, b) =>
            a.toLowerCase().replace(/\s+/g, ``).indexOf(query) >
            b.toLowerCase().replace(/\s+/g, ``).indexOf(query)
              ? 1
              : -1
          );

  const Result = ({ data }) => {
    return (
      <>
        <div className="flex max-h-[50vh] flex-col">
          {query !== `` ? (
            data.length !== 0 ? (
              <>
                {data.map((i) => (
                  <Link
                    key={i}
                    href={`/game/` + i.toLowerCase().replace(/\s+/g, `-`)}
                  >
                    <a
                      onClick={() => {
                        setQuery(() => ``);
                        setResult(() => null);
                      }}
                      className="flex items-center space-x-2 rounded-lg py-2 px-4 hover:bg-slate-100"
                      title={i}
                    >
                      <span>
                        <Image
                          className={`rounded-full bg-slate-100`}
                          src={i}
                          alt={i}
                          width={40}
                          height={40}
                        />
                      </span>
                      <span>{i}</span>
                    </a>
                  </Link>
                ))}
              </>
            ) : (
              <div className="px-4">No results</div>
            )
          ) : null}
        </div>
      </>
    );
  };

  useEffect(() => {
    // let searchText = document.querySelector(`#search-input`);
    // searchText.addEventListener(`propertyChange`, handleInput);
  }, []);
  return (
    <div className="fixed top-1/2 left-1/2 z-20 h-fit w-full max-w-4xl -translate-y-1/2 -translate-x-1/2 xl:h-auto">
      <div className="m-4 rounded-2xl bg-white p-4 shadow-lg ">
        <input
          onChange={(e) =>
            setQuery(e.target.value.toLowerCase().replace(/\s+/g, ``))
          }
          className="search w-full border-b p-4 text-lg"
          id="search-input"
          placeholder="Search"
        />
        <div className="result mt-3 h-60 overflow-y-scroll bg-white">
          <Result data={filterGames} />
        </div>
      </div>
    </div>
  );
}
