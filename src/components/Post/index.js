import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_BANNER_URL } from "../../constants/images";

// TODO: add placeholder image, and change img to Image
function Post(props) {
  const { post } = props;
  const {
    bannerUrl,
    title,
    createdAt,
    author: { name: authorName, image: authorImage, id: authorId },
  } = post;
  console.log({ post });

  const [formattedDate, capitalizedTitle] = useMemo(
    () => [
      new Date(createdAt).toDateString(),
      `${title[0].toUpperCase()}${title.slice(1)}`,
    ],
    [title, createdAt]
  );

  return (
    <div className="mb-2 w-full flex flex-col gap-2 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
      <figure className="w-full h-56 relative rounded">
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
          <Link href={`/${authorId}`}>
            <a className="text-sm font-medium">{authorName}</a>
          </Link>
          <p className="text-xs text-gray-700">{formattedDate}</p>
        </div>
      </div>
      <h3 className="text-2xl font-bold">{capitalizedTitle}</h3>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bannerUrl: PropTypes.string,
    createdAt: PropTypes.number.isRequired,
    author: {
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    },
  }).isRequired,
};
export default Post;
