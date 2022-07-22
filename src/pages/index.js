import Head from "next/head";
// import PropTypes from "prop-types";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { POST_API } from "../constants/api-endpoints";
import { getLatestPostsFromDb } from "./api/posts";

async function getLatestPosts() {
  const response = await fetch(POST_API.LATEST_POSTS);
  const json = await response.json();
  return json;
}

export default function Home() {
  const { data } = useQuery(["latest-posts"], getLatestPosts);

  return (
    <div>
      <Head>
        <title>Posted: all posts</title>
        <meta name="description" content="Generated by create next app" />
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
