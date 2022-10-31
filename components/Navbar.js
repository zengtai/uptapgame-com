import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SITE_META } from "../lib/constants";
import Search from "./Search";

export default function Navbar({ navItems }) {
  const [isOpen, setIsOpen] = useState(false); // 默认不展开导航菜单
  const [openSearch, setOpenSearch] = useState(false);
  const router = useRouter();
  // const currentQuery = router.query;
  const currentPath = router.asPath;

  // console.log(`router: `, router);
  // console.log(`currentQuery: `, currentQuery);
  // console.log(`currentPath: `, currentPath);

  function handleClick() {
    setIsOpen(() => !isOpen);
    // console.log(`isOpen`, isOpen);
  }

  function handleSearch() {
    setOpenSearch(() => !openSearch);
  }

  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item a"); // 导航链接集合
    let currentItem = document.querySelector(".current"); // 选取.current
    currentItem && currentItem.classList.remove("current"); // 如果存在.current则先移除

    for (let i of menuItems) {
      i.getAttribute("href") === currentPath
        ? (i.parentNode.classList += " current")
        : null;
      // console.log(`parent Ele: `, i.parentElement);
      // console.log(`parent Node: `, i.parentNode);
      // console.log(`a href: `, i.getAttribute("href"));
      // console.log(`b: `, i.parentNode.classList);
      // console.log(`currentQuery: `, currentQuery.slug);
    }
  }, [currentPath]);
  return (
    <header>
      <nav className="site-nav">
        <Link href={`/`} title={SITE_META.NAME}>
          <a className="home-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <span className="sr-only">{SITE_META.NAME}</span>
          </a>
        </Link>
        <button className="menu-button" onClick={handleClick}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <div className={(isOpen ? "" : "hidden ") + "menu-panel"}>
          <ul className="menu-list">
            <li className="menu-item">
              <Link href={`/all`}>All</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/adventure`}>Adventure</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/` + `arcade`}>Arcade</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/casual`}>Casual</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/girl`}>Girl</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/io`}>IO</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/match-3`}>Match 3</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/puzzle`}>Puzzle</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/racing`}>Racing</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/shooting`}>Shooting</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/simulation`}>Simulation</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/sports`}>Sports</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/strategy`}>Strategy</Link>
            </li>
          </ul>
        </div>
        <div
          onClick={handleSearch}
          className="search-icon absolute -top-1 right-10 text-sky-300 xl:right-3.5 xl:top-3 xl:text-cyan-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 xl:h-10 xl:w-10"
          >
            <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className={openSearch ? "relative z-20" : "hidden"}>
          <Search />
          <div
            onClick={handleSearch}
            className="mask fixed inset-0 z-10 bg-black/30"
          ></div>
        </div>
      </nav>
    </header>
  );
}
