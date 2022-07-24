import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import React from "react";
import MainPageWrapper from "../../components/MainPageWrapper";
import { POST_API } from "../../constants/api-endpoints";

// TODO change api route for user followed users posts api
async function getLatestPosts() {
  const response = await fetch(POST_API.LATEST_POSTS);
  const json = await response.json();
  if (response.status > 399) throw json || response.statusText;
  return json;
}

// TODO: this page is user dependent, so will run in protected route, so getStaticProps is not applicable here
// and also it is behind auth wall, getServerSide props is also not required, client side fetching will do the work
function FollowingPosts(props) {
  const { data, error, isLoading } = useQuery(
    ["followed-user-posts"],
    getLatestPosts
  );

  if (isLoading) return <div>TODO: Loading...</div>;
  if (!data && error) return <div>TODO: {error}</div>;

  return (
    <>
      <Head>
        <title>Posted: Posts of followed people</title>
      </Head>
      <MainPageWrapper posts={data} />
    </>
  );
}

export default FollowingPosts;
