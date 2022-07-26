import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../components/SideBar";
import MaxWidthContainer from "../components/common/MaxWidthContainer";
import { getUniquePostFromDb } from "./api/post/[postSlug]";
import axiosInstance, { POST_API } from "../constants/api-config";
import { DEFAULT_BANNER_URL } from "../constants/images";

// TODO: change to getStaticProps with fallback true and right bar with like etc
function PostDetails(props) {
  const router = useRouter();
  const { postSlug } = router.query;

  const getUniquePost = async () => {
    const response = await axiosInstance.get(`${POST_API.POST}/${postSlug}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    [`post-${postSlug}`],
    getUniquePost
  );

  const [formattedDate, capitalizedTitle] = useMemo(() => {
    if (!data.title || !data.createdAt) return [];
    return [
      new Date(data.createdAt).toDateString(),
      `${data.title[0].toUpperCase()}${data.title.slice(1)}`,
    ];
  }, [data?.title, data?.createdAt]);

  if (isLoading) return <div>TODO: single post loading...</div>;
  if (!data && error) return <div>TODO: error, retry</div>;

  const { bannerUrl, title, author, createdAt } = data;
  const { name: authorName, id: authorId, image: authorImage } = author;

  return (
    <MaxWidthContainer>
      <div className="flex gap-4 w-full">
        <div className="flex-1 flex flex-col items-center bg-gray-900 rounded-md gap-10">
          <figure className="w-full h-96 relative rounded-md">
            <Image
              src={bannerUrl ?? DEFAULT_BANNER_URL}
              alt={title}
              layout="fill"
              className="rounded-tl-md rounded-tr-md"
            />
          </figure>

          <div className="flex flex-col w-full gap-4 px-4">
            <div className="w-full flex gap-3 items-center">
              <Image
                width={40}
                height={40}
                alt={`author-${authorId}`}
                src={authorImage}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <Link href={`/author/${authorId}`}>
                  <a className="text-base font-medium">{authorName}</a>
                </Link>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full mb-2">
              <h1 className="text-5xl font-bold">{capitalizedTitle}</h1>
            </div>
            <div className="w-full">{data.content}</div>
          </div>
        </div>
        <Sidebar />
      </div>
    </MaxWidthContainer>
  );
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const { postSlug } = context.query;
  console.log("Server side postSlug", postSlug);
  await queryClient.prefetchQuery([`post-${postSlug}`], () =>
    getUniquePostFromDb(postSlug)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

PostDetails.propTypes = {};
export default PostDetails;
