import Image from "next/image";
import Logo from "@/public/images/AG_LOGO.svg";
import Link from "next/link";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SITE_META } from "@/lib/constants";
// import { useRouter } from "next/router";
const Navbar = dynamic(() => import("./Navbar"));
const SearchPanel = dynamic(() => import("./SearchPanel"));
// import Navbar from "./Navbar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function updateSearchState(newState) {
    setShowSearch(newState);
  }
  function updateMenuState(newState) {
    setMenuOpen(newState);
  }

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="branding m-4">
            <Link href={`/`} title={SITE_META.NAME}>
              <Image
                src={Logo}
                width="128"
                height="148"
                className="w-8 xl:w-10"
                alt={SITE_META.NAME}
              />
            </Link>
          </div>

          <Navbar menuOpen={menuOpen} setMenuState={updateMenuState} />
          <div>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="search-icon p-2"
              title="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
            <button
              onClick={toggleMenu}
              className="m-3 p-2 text-white xl:hidden"
              title="Menu"
            >
              {!menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <Suspense fallback={<div>Loading</div>}>
        {showSearch && (
          <SearchPanel isShow={showSearch} updateState={updateSearchState} />
        )}
      </Suspense>
    </>
  );
}
