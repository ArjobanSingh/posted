import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { DEFAULT_BANNER_URL } from "../../constants/images";
import { handleEnter, stopPropagation } from "../../lib/common";

// TODO: add placeholder image
function Post(props) {
  const { post } = props;
  const {
    bannerUrl,
    title,
    slug,
    createdAt,
    tags,
    author: { name: authorName, image: authorImage, id: authorId },
  } = post;
  const router = useRouter();

  const [formattedDate, capitalizedTitle] = useMemo(
    () => [
      new Date(createdAt).toDateString(),
      `${title[0].toUpperCase()}${title.slice(1)}`,
    ],
    [title, createdAt]
  );

  const openPost = () => {
    router.push(`/${slug}`);
  };

  return (
    <div
      className="mb-2 w-full flex flex-col gap-2 p-4 bg-gray-800 border-b border-gray-600 cursor-pointer"
      role="button"
      onClick={openPost}
      tabIndex={0}
      onKeyDown={handleEnter(openPost)}
    >
      <figure className="w-full h-52 relative rounded">
        <Image
          src={bannerUrl ?? DEFAULT_BANNER_URL}
          alt={post.title}
          layout="fill"
          className="rounded"
        />
      </figure>

      <div className="flex gap-1 items-center">
        <Image
          width={32}
          height={32}
          alt={`author-${authorId}`}
          src={authorImage}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div
            onClick={stopPropagation}
            onKeyDown={handleEnter(stopPropagation)}
            role="presentation"
          >
            <Link href={`/author/${authorId}`}>
              <a className="text-sm font-medium">{authorName}</a>
            </Link>
          </div>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <div
        className="flex flex-col gap-2 w-[90%]"
        onClick={stopPropagation}
        onKeyDown={handleEnter(stopPropagation)}
        role="presentation"
      >
        <h3 className="text-2xl font-bold  hover:text-sky-500">
          <Link href={`/${slug}`}>
            <a>{capitalizedTitle}</a>
          </Link>
        </h3>
      </div>

      <ul className="flex gap-2">
        {tags.map((tag) => (
          <li
            key={tag.tagName}
            className="border border-gray-700 px-2 hover:border-gray-600 rounded-md flex flex-col justify-center"
            onClick={stopPropagation}
            onKeyDown={handleEnter(stopPropagation)}
            role="presentation"
          >
            <Link href={`/tag/${tag.tagName}`}>
              <a>#{tag.tagName}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    bannerUrl: PropTypes.string,
    createdAt: PropTypes.number.isRequired,
    author: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
    tags: PropTypes.arrayOf(PropTypes.shape({ tagName: PropTypes.string })),
  }).isRequired,
};
export default Post;
