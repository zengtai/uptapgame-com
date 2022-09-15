import Link from "next/link";
import { SITE_META } from "../lib/constants";

export default function Navbar(params) {
  return (
    <>
      <header>
        <nav>
          <Link href={`/`} title={SITE_META.NAME}>
            {SITE_META.NAME}
          </Link>
          <button></button>
          <div>
            <ul>
              <li>
                <Link></Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
