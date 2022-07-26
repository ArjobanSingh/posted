import Head from "next/head";
// import PropTypes from "prop-types";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axiosInstance, { POST_API } from "../constants/api-config";
import { getLatestPostsFromDb } from "./api/post";
import MainPageWrapper from "../components/MainPageWrapper";

// const isBrowser = !!typeof window;
async function getLatestPosts() {
  const response = await axiosInstance.get(POST_API.POST);
  return response.data;
}

// will add on demand ISR to update this on new post
export default function Home() {
  // if api failed in on demand ISR builing, we should have loading
  // and error checks on client to handle client api
  const { data, error, isLoading } = useQuery(["latest-posts"], getLatestPosts);

  return (
    <>
      <Head>
        <title>Posted: all posts</title>
        <meta
          name="description"
          content="A common place for learning from blogs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPageWrapper
        posts={data}
        isPostsLoading={isLoading}
        postsError={!data && error ? error : ""}
      />
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["latest-posts"], getLatestPostsFromDb);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
