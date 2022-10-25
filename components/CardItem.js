import Link from "next/link";
import Image from "next/future/image";

export default function CardItem({ item }) {
  return (
    <li key={item.slug} className="item">
      {index < 10 ? (
        <div className="absolute grid items-center top-1 left-1 z-10 bg-white w-7 h-7 font-bold rounded-full text-center">
          <span
            className={
              index < 1
                ? `text-orange-500`
                : index < 2
                ? `text-sky-500`
                : index < 3
                ? `text-lime-500`
                : `text-slate-400 text-sm`
            }
          >
            {index + 1}
          </span>
        </div>
      ) : null}
      <Link href={`/game/` + item.slug}>
        <a className="flex h-24 space-x-3 p-2 border rounded-2xl">
          <Image
            className="image"
            src={getImageUrl(item.title)}
            alt={item.title}
            width={100}
            height={100}
            loading={index <= 9 ? `eager` : `lazy`}
          />
          <div>
            <div className="mt-1 mb-3 text-sky-700">{item.title}</div>
            <div>
              <span className="bg-star mr-3 pl-6 bg-no-repeat text-orange-500 font-bold">
                {item.rating}
              </span>
              <span className="bg-play pl-7 bg-no-repeat bg-left text-sm text-slate-400">
                {item.played}
              </span>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}
