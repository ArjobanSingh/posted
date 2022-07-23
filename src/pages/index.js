import Head from "next/head";
// import PropTypes from "prop-types";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { POST_API } from "../constants/api-endpoints";
import { getLatestPostsFromDb } from "./api/posts";

// const isBrowser = !!typeof window;
async function getLatestPosts() {
  const response = await fetch(POST_API.LATEST_POSTS);
  const json = await response.json();
  return json;
}

export default function Home() {
  const { data, error, isLoading } = useQuery(["latest-posts"], getLatestPosts);

  if (isLoading) return <div>TODO: Loading...</div>;
  if (!data && error) return <div>TODO: {error}</div>;

  return (
    <div>
      <Head>
        <title>Posted: all posts</title>
        <meta
          name="description"
          content="A common place for learning from blogs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {data.map((post) => (
          <div className="mb-3" key={post.id}>
            {post.title}
            {new Date(post.createdAt).toString()}
          </div>
        ))}
      </div>
    </div>
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
