// import Image from "next/future/image";
import Image from "./Image";
import Link from "next/link";
// import { getImageUrl } from "../lib/api";

export default function ListItem({ item, option }) {
  // console.log(option);

  return (
    <li className="item">
      <Link href={`/game/` + item.slug}>
        <a className="item-link" title={item.title}>
          {option && option.includes(`rating`) ? (
            <div className="relative">
              <Image
                className="image"
                src={item.title}
                width={100}
                height={100}
                alt={item.title}
              />
              <div className="rating">{item.rating}</div>
            </div>
          ) : (
            <Image
              className="image"
              src={item.title}
              width={100}
              height={100}
              alt={item.title}
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
