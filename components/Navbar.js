import Link from "next/link";
import { SITE_META } from "../lib/constants";

export default function Navbar(params) {
  return (
    <header>
      <nav className="m-4 relative">
        <Link href={`/`} title={SITE_META.NAME}>
          <a className="home-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <span className="sr-only">{SITE_META.NAME}</span>
          </a>
        </Link>
        <button className="menu-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="menu-panel">
          <ul className="menu-list">
            <li className="menu-item">
              <Link href={`/`}>All</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Adventure</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Arcade</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Casual</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Girl</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>IO</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Match 3</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Puzzle</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Racing</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Shooting</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Simulation</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Sports</Link>
            </li>
            <li className="menu-item">
              <Link href={`/`}>Strategy</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
