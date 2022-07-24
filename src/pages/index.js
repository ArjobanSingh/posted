import Head from "next/head";
// import PropTypes from "prop-types";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { POST_API } from "../constants/api-endpoints";
import { getLatestPostsFromDb } from "./api/posts";
import MainPageWrapper from "../components/MainPageWrapper";

// const isBrowser = !!typeof window;
// TODO: use axios maybe
async function getLatestPosts() {
  const response = await fetch(POST_API.LATEST_POSTS);
  const json = await response.json();
  if (response.status > 399) throw json || response.statusText;
  return json;
}

// will add on demand ISR to update this on new post
export default function Home() {
  const { data, error, isLoading } = useQuery(["latest-posts"], getLatestPosts);

  // if api failed in on demand ISR builing, we should have loading
  // and error checks on client to handle client api
  if (isLoading) return <div>TODO: Loading...</div>;
  if (!data && error) return <div>TODO: {error}</div>;

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
      <MainPageWrapper posts={data} />
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
