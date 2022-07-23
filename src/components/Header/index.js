import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

function Header(props) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 flex justify-between items-center px-4 shadow-md border-b border-gray-200">
      <div className="flex items-center gap-1">
        <div>
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
        </div>
        <input
          type="text"
          className="hidden md:inline-block border border-cyan-400"
        />
      </div>

      <div>
        <Link href="/search">
          <a
            type="button"
            className="md:hidden hover:text-blue-600 p-2 hover:bg-blue-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </a>
        </Link>
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
