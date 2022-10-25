import Image from "next/future/image";
import Link from "next/link";
import { getImageUrl } from "../lib/api";

export default function ListItem({ item, option }) {
  // console.log(option);

  return (
    <li className="item">
      <Link href={`/game/` + item.slug}>
        <a>
          {option && option.includes(`rating`) ? (
            <div className="relative">
              <Image
                className="image"
                src={getImageUrl(item.title)}
                alt={item.title}
                width={100}
                height={100}
              />
              <div className="rating">{item.rating}</div>
            </div>
          ) : (
            <Image
              className="image"
              src={getImageUrl(item.title)}
              alt={item.title}
              width={100}
              height={100}
            />
          )}
          {option && option.includes(`title`) ? (
            <div className="title">{item.title}</div>
          ) : null}
        </a>
      </Link>
    </li>
  );
}
