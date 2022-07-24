import React from "react";
// import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

export const postTabs = [
  {
    title: "Latest",
    href: "/",
    isActive: (pathname) => pathname === "/",
  },
  {
    title: "Following",
    href: "/posts/following",
    isActive: (pathname) => pathname === "/posts/following",
  },
];

function PostTab() {
  const route = useRouter();

  return (
    <ul className="flex w-full gap-4 mb-4 text-gray-500">
      {postTabs.map((val) => (
        <li key={val.title}>
          <Link href={val.href}>
            <a
              className={`text-lg border-b py-2 px-3 hover:text-black ${
                val.isActive(route.pathname)
                  ? "border-black text-black font-bold"
                  : "border-neutral-100"
              }`}
            >
              {val.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

PostTab.propTypes = {};

export default PostTab;
