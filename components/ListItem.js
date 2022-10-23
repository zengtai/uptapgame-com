import Image from "next/future/image";
import Link from "next/link";
import { IMAGE_FORMAT, IMAGE_PATH } from "../lib/constants";

export default function ListItem({ item }) {
  return (
    <li className="list-item">
      <Link href={`/game/` + item.slug}>
        <a>
          <Image
            className="image"
            src={IMAGE_PATH + item.appid + `.` + IMAGE_FORMAT}
            alt={item.title}
            width={100}
            height={100}
          />
          <div className="title">{item.title}</div>
          {/* <div className="category">{item.category.name}</div> */}
          {/* <div className="rating">{item.rating}</div> */}
        </a>
      </Link>
    </li>
  );
}
