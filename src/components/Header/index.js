import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import SearchIcon from "../common/SearchIcon";
import MaxWidthContainer from "../common/MaxWidthContainer";

function Header(props) {
  return (
    <header className="sticky top-0 left-0 right-0 shadow-sm bg-white z-20">
      <MaxWidthContainer>
        <div className="flex justify-between items-center px-4 py-2 h-14">
          <div className="flex items-center h-full">
            <div className="flex items-center gap-2 h-full">
              <Link href="/">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
              </Link>

              <div>
                <h1 className="md:hidden text-2xl font-semibold">Posted</h1>
              </div>
              <div className="hidden md:flex relative items-center h-full">
                <input
                  type="text"
                  className="border border-gray-300 h-full w-80 rounded pl-2 pr-10 focus:outline-blue-500"
                  placeholder="Search..."
                />
                <div className="absolute text-2xl right-2">
                  <SearchIcon />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center h-full">
            <Link href="/search">
              <a
                type="button"
                className="md:hidden hover:text-blue-500 p-2 hover:bg-blue-100 rounded text-2xl"
              >
                <SearchIcon />
              </a>
            </Link>
          </div>
        </div>
      </MaxWidthContainer>
    </header>
  );
}

Header.propTypes = {};

export default Header;
